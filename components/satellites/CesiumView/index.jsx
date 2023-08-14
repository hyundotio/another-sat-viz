// utils
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import propagateObjects from "@/utils/satellites/propagateObjects";
import { Globe, Close, SearchLocate, SelectWindow, ChevronLeft, Menu } from '@carbon/icons-react';
import { throttle } from "lodash";
import { IconButton, Button, UnorderedList, ListItem, ToastNotification, Toggle } from '@carbon/react';

// components and styles
import Options from "@/components/satellites/Options";
import TimeControls from "@/components/satellites/TimeControls";
import styles from "./index.module.scss";
import Search from "@/components/satellites/Search";
import SelectedEntitiesList from "@/components/satellites/SelectedEntitiesList";

const CesiumView = ({ recentLaunches, setLoadingStatus }) => {

  const interpolationDegree = 7;
  const initialClockMultiplier = 0;
  const startDate = useMemo(() => new Date(), []);
  const viewer = useRef({}); // Cesium viewer object reference
  const notificationTimerID = useRef();

  // categories that will have their objects hidden on load
  const hiddenByDefault = useMemo(() => ["Uncategorized", "Rocket body", "Debris"], []);

  const helperFunctionsRef = useRef();
  
  const [isSelectedEntitiesListOpen, setIsSelectedEntitiesListOpen] = useState(false);
  const [objectCategories, setObjectCategories] = useState([]);
  const [orbitCategories, setOrbitCategories] = useState([
    {
      orbitName: 'leo',
      type: 0,
      visible: true
    },
    {
      orbitName: 'meo',
      type: 1,
      visible: true
    },
    {
      orbitName: 'geo',
      type: 2,
      visible: true
    }
  ]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [isTracking, setIsTracking] = useState('');
  const [failMessage, setFailMessage] = useState({ satnum: '', catname: ''});
  const [sidemenuOpened, setSidemenuOpened] = useState(true);
  const [threeDView, setThreeDView] = useState(true);

  const resetClock = (date) => {
    if (viewer.current && viewer.current.clock && helperFunctionsRef.current) {
      const dateToUse = date ? date : startDate;
      const start = helperFunctionsRef.current.JulianDate.fromDate(dateToUse);
      viewer.current.clock.startTime = start.clone();
      viewer.current.clock.currentTime = start.clone();
      changePointsVisibility(true);
    }
  }

  // change time flow multiplier
  const changeMultiplier = (multiplier) => {
    viewer.current.clock.shouldAnimate = multiplier !== 0;
    viewer.current.clock.multiplier = multiplier;
  };

  // toggle points visibility of a specified category
  const changePointsVisibility = (processAll) => {
    const newEntities = viewer.current.entities.values;
    const newEntitiesLen = newEntities.length;
    
    for (let i = 0; i < newEntitiesLen; i++) {
      const entity = newEntities[i];

      const validObjectCategory = objectCategories.some(c => c.visible && c.name.toLowerCase() === entity.categoryName.toLowerCase());
      const validOrbitCategory = orbitCategories.some(c => c.visible && c.type === entity.orbitType);
      
      if (processAll === undefined) {
        entity.show = validObjectCategory && validOrbitCategory;
      }
      if (viewer.current.clock.multiplier === 0 && entity.allPositions) {
        entity.position = entity.allPositions.getValue(viewer.current.clock.currentTime);
      }
    }

    const newSelectedEntities = [];
    const selectedEntitiesLen = selectedEntities.length;

    //Handle unselecting selected objects if it is not visible anymore
    for (let i = 0; i < selectedEntitiesLen; i++) {
      const selectedEntity = selectedEntities[i];

      const validObjectCategory = objectCategories.some(c => c.visible && c.name.toLowerCase() === selectedEntity.categoryName.toLowerCase());
      const validOrbitCategory = orbitCategories.some(c => c.visible && c.type === selectedEntity.orbitType);

      if (validObjectCategory && validOrbitCategory) {
        newSelectedEntities.push(selectedEntity);
      } else {
        const entity = viewer.current.entities.getById(selectedEntity.id);
        handleSelectEntity({id: entity}, {
          Color: helperFunctionsRef.current.Color,
          LabelGraphics: helperFunctionsRef.current.LabelGraphics,
          Cartesian2: helperFunctionsRef.current.Cartesian2,
          Cartesian3: helperFunctionsRef.current.Cartesian3,
          LabelStyle: helperFunctionsRef.current.LabelStyle,
          VerticalOrigin: helperFunctionsRef.current.VerticalOrigin,
        });
      }
    }
    setSelectedEntities(newSelectedEntities);
    
  };

  const toggleOrbitVisibility = (orbitCategory) => {
    const newOrbitCategories = [...orbitCategories];
    const orbitCategoryObject = newOrbitCategories[orbitCategory];

    if (typeof orbitCategoryObject === 'object') {
      orbitCategoryObject.visible = !orbitCategoryObject.visible;
      changePointsVisibility();
      setOrbitCategories(newOrbitCategories);
    }
  }

  // toggle visibility of a specified category and all its objects
  const toggleCategoryVisibility = (name) => {
    const newCategories = [...objectCategories];
    let changedCategory = null;

    newCategories.forEach((category) => {
      if (category.name === name) {
        changedCategory = category;
        category.visible = !category.visible;
      }
    });

    setObjectCategories(newCategories);
    changePointsVisibility();
  };

  const handleSelectEntity = useCallback((pickedObject, helperFunctions) => {
    const { Color, LabelGraphics, Cartesian2, Cartesian3, LabelStyle, VerticalOrigin } = helperFunctions;
    // orbit path polyline
    const polylineID = `orbit-path-${pickedObject.id.id}`;
    if (pickedObject.id.wasSelected) {
      const newImageUrl = pickedObject.id.billboard.image._value.replace('_selected.png','.png');
      // Reset selected entity size and clear its orbit path and label
      pickedObject.id.billboard.height = pickedObject.id.originalIconSize;
      pickedObject.id.billboard.width = pickedObject.id.originalIconSize;
      pickedObject.id.billboard.image = newImageUrl;
      pickedObject.id.wasSelected = false;
      pickedObject.id.label = undefined;
      viewer.current.entities.removeById(polylineID);
      setSelectedEntities(items => {
        return items.filter(item => item.id !== pickedObject.id.id);
      });
    } else {
      const newImageUrl = pickedObject.id.billboard.image._value.split('.png')[0] + '_selected.png';
      pickedObject.id.wasSelected = true;
      pickedObject.id.billboard.height = 16;
      pickedObject.id.billboard.width = 16;
      pickedObject.id.billboard.image = newImageUrl;

      // Add label'
      const fillColor = pickedObject.id.needsDarkText ? new Color.fromBytes(22,22,22,255) : new Color.fromBytes(244,244,244,255);
      const bgColor = pickedObject.id.baseColor.clone();
      pickedObject.id.label = new LabelGraphics({
        showBackground: true,
        fillColor: fillColor,
        backgroundColor: bgColor,
        backgroundPadding: new Cartesian2(14, 14),
        text: `${pickedObject.id.name.trim()} (${pickedObject.id.satnum})`,
        style : LabelStyle.FILL,
        verticalOrigin : VerticalOrigin.BOTTOM,
        pixelOffset : new Cartesian2(0, -10),
        // Increased size and reduced scaling to improve resolution of the text
        font : `normal 64px IBMPlexBold`,
        scale: 0.2,
      });

      if (!pickedObject.id.allPositions) {
        return;
      }

      // Get array of JulianDate times
      const times = pickedObject.id.allPositions._property._times; 
      
      // Extract Cartesian3 positions from the SampledPositionProperty
      const cartesianPositions = [];
      for (let i = 0; i < times.length; i++) {
        const cartesianPosition = new Cartesian3();
        pickedObject.id.allPositions.getValue(times[i], cartesianPosition);
        cartesianPositions.push(cartesianPosition);
      }

      // Add the orbit path polyline to the viewer
      viewer.current.entities.add({
        categoryName: pickedObject.id.categoryName,
        id: polylineID,
        polyline: {
          positions: cartesianPositions,
          width: 1,
          material: Color.clone(pickedObject.id.baseColor),
        },
      });
      setSelectedEntities(items => {
        if (items.some(item => item.id === pickedObject.id.id)) {
          return items
        }
        return [...items, {
          id: pickedObject.id.id,
          name: pickedObject.id.name,
          satnum: pickedObject.id.satnum,
          orbitType: pickedObject.id.orbitType,
          categoryName: pickedObject.id.categoryName,
          baseColor: pickedObject.id.baseColor,
          epochDate: pickedObject.id.epochDate
        }]
      });
    }
  }, [setSelectedEntities])

  // propagate objects for each category and get information about categories
  const propagateCategories = useCallback((combinedTLE, helperFunctions) => {
    // Add recent launches to the beginning of the list
    if (recentLaunches) {
      combinedTLE.unshift({
        color: {
          alpha: 1,
          blue: 1,
          green: 0,
          red: 1,
        },
        data: recentLaunches,
        name: "Past month launches",
      });
    }

    const initialObjectCategories = [];
    const propagatedCategories = [];
    let seenSats = [];

    combinedTLE.forEach((category) => {
      const { newSeen, data } = propagateObjects(seenSats, category.data, startDate, interpolationDegree, helperFunctions);
      seenSats = newSeen;

      if (data.length > 0) {
        const extraData = {
          name: category.name,
          color: category.color,
          visible: !hiddenByDefault.includes(category.name),
          needsDarkText: category.needsDarkText,
          kind: category.kind
        };

        initialObjectCategories.push({
          objectsCount: data.length,
          ...extraData
        });

        propagatedCategories.push({
          data,
          ...extraData
        });
      }
    });

    return {
      propagatedCategories,
      initialObjectCategories
    };
  }, [hiddenByDefault, recentLaunches, startDate]);

  const resetCamera = () => {
    //Reset camera to untrack
    setIsTracking('');
    viewer.current.trackedEntity = undefined;
    viewer.current.camera.flyHome(0.6); // animation time in seconds
  };

  // Remove polylines, labels and reset sizes for points
  const clearExtraEntities = () => {
    const entities = viewer.current.entities.values.slice();
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (entity.polyline) {
        viewer.current.entities.remove(entity);
      } else if (entity.wasSelected) {
        const newImageUrl = entity.billboard.image._value.replace('_selected.png','.png');
        // 'wasSelected' means that the point has label and increased pixel size
        entity.wasSelected = false;
        entity.label = undefined;
        entity.billboard.height = entity.originalIconSize;
        entity.billboard.width = entity.originalIconSize;
        entity.billboard.image = newImageUrl;
      }
    }
    setSelectedEntities([]);
  };

  const trackEntity = (id) => {
    //Function is used to camera track an entity
    if (id !== undefined) {
      const entity = viewer.current.entities.getById(id);
      if (entity.show) {
        viewer.current.trackedEntity = entity;
        setIsTracking(id);
      } else {
        setFailMessage({ catname: entity.categoryName, satnum: entity.satnum });
        //entity is not visible. let user know?
        //entity.category
      }
      
    } else {
      resetCamera();
    }
  }

  const selectEntity = (id) => {
    //Function is used to select an entity or unselect.
    if (id) {
      const entity = viewer.current.entities.getById(id);
      if (entity.show) { 
        // Start tracking the entity
        viewer.current.trackedEntity = entity;
        setIsTracking(id);
        // Trigger the selectedEntityChanged event manually to show
        // entity orbit path and label if it's not showing them yet
        handleSelectEntity({id: entity}, {
          Color: helperFunctionsRef.current.Color,
          LabelGraphics: helperFunctionsRef.current.LabelGraphics,
          Cartesian2: helperFunctionsRef.current.Cartesian2,
          Cartesian3: helperFunctionsRef.current.Cartesian3,
          LabelStyle: helperFunctionsRef.current.LabelStyle,
          VerticalOrigin: helperFunctionsRef.current.VerticalOrigin,
        });
      } else {
        setFailMessage({ catname: entity.categoryName, satnum: entity.satnum });
        //entity is not visible. let user know?
        //entity.category
      }
      
    }
  };

  useEffect(() => {
    if (viewer.current && viewer.current.scene) {
      if (threeDView) {
        viewer.current.scene.mode = 3;
        //Cesium.SceneMode.SCENE3D
      } else {
        viewer.current.scene.mode = 2;
        //Cesium.SceneMode.SCENE2D
      }
    }
  },[threeDView])

  useEffect(() => {
    //First load fonts
    const plexFont = new FontFace('IBMPlexBold', 'url(./fonts/IBMPlexSans-Bold.woff)');
    plexFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
        setFontIsLoaded(true);
    }).catch(function(error) {
      // error occurred
    });

    return () => {
      clearTimeout(notificationTimerID.current);
    }
  }, []);

  useEffect(() => {
    if (failMessage.catname && failMessage.satnum) {
      notificationTimerID.current = setTimeout(() => {
        setFailMessage({catname: '', satnum: ''});
      }, 6000);
    }
  }, [failMessage])
  
  useEffect(() => {
    if (selectedEntities.length === 0) setIsSelectedEntitiesListOpen(false);
  }, [selectedEntities])

  useEffect(() => {
    //Do not re-render via React if loaded OR if font is not loaded.
    if (isLoaded || !fontIsLoaded) {
      return;
    }
    const combinedTLE = import("@/utils/satellites/combinedTLE");
    const Cesium = import("@/cesiumSource/Cesium");

    Promise.all([Cesium, combinedTLE]).then((values) => {

      setIsLoaded(true);

      // destructure imported modules
      const { ...Cesium } = values[0];
      const { default: combinedTLE } = values[1];

      // refs for helper functions
      helperFunctionsRef.current = {
        Color: Cesium.Color,
        ClockRange: Cesium.ClockRange,
        LabelGraphics: Cesium.LabelGraphics,
        Cartesian2: Cesium.Cartesian2,
        Cartesian3: Cesium.Cartesian3,
        LabelStyle: Cesium.LabelStyle,
        VerticalOrigin: Cesium.VerticalOrigin,
        SampledPositionProperty: Cesium.SampledPositionProperty,
        JulianDate: Cesium.JulianDate,
        Cartographic: Cesium.Cartographic
      }

      if (process.env.NEXT_PUBLIC_CESIUM_TOKEN) {
        Cesium.Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN;
      }
      

      // create Cesium viewer
      viewer.current = new Cesium.Viewer("cesium-container", {
        imageryProvider: false,
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        targetFrameRate: 60,
        requestRenderMode: false,
        maximumScreenSpaceError: 128
      });

      if (process.env.NEXT_PUBLIC_MAPBOX_URL) {
        const mapboxLayer = new Cesium.UrlTemplateImageryProvider({
          url : process.env.NEXT_PUBLIC_MAPBOX_URL,
       });
        // set world imagery
        viewer.current.imageryLayers.addImageryProvider(
          mapboxLayer
        );
      }

      // add settings for Cesium
      const start = Cesium.JulianDate.fromDate(startDate);
      viewer.current.clock.startTime = start.clone();
      viewer.current.clock.currentTime = start.clone();
      viewer.current.clock.canAnimate = true;
      viewer.current.clock.shouldAnimate = false;
      viewer.current.clock.multiplier = initialClockMultiplier;
      viewer.current.clock.clockStep = Cesium.ClockRange.TICK_DEPENDENT;
      viewer.current.scene.screenSpaceCameraController.minimumZoomDistance = 4e6; // max zoom-in distance in meters
      viewer.current.scene.screenSpaceCameraController.maximumZoomDistance = 0.5e9; // max zoom-out distance in meters
      viewer.current.scene.globe.depthTestAgainstTerrain = true; // Make things behind terrain disappear
      viewer.current.scene.globe.atmosphereBrightnessShift = -0.3;
      viewer.current.scene.globe.atmosphereLightIntensity = 10;
      viewer.current.scene.globe.enableLighting = true;
      viewer.current.scene.skyBox = new Cesium.SkyBox({
        sources: {
          positiveX: './cesiumAssets/skybox.png',
          negativeX: './cesiumAssets/skybox.png',
          positiveY: './cesiumAssets/skybox.png',
          negativeY: './cesiumAssets/skybox.png',
          positiveZ: './cesiumAssets/skybox.png',
          negativeZ: './cesiumAssets/skybox.png',
        }
      });
      viewer.current.scene.sun.destroy();
      viewer.current.scene.sun = undefined;

      // Calculate position from TLE data
      const {propagatedCategories, initialObjectCategories} = propagateCategories(combinedTLE, {
        SampledPositionProperty: helperFunctionsRef.current.SampledPositionProperty,
        JulianDate: helperFunctionsRef.current.JulianDate,
        Cartesian3: helperFunctionsRef.current.Cartesian3,
        Cartographic: helperFunctionsRef.current.Cartographic
      });

      // Create entities for each object
      const points = [];
      propagatedCategories.forEach((category) => {
        let iconUrlEnd;
        if (category.kind === "DEBRIS") {
          iconUrlEnd = '_debris.png';
        } else if (category.kind === "UNCATEGORIZED") {
          iconUrlEnd = '_unknown.png';
        } else {
          iconUrlEnd = '.png';
        }

        category.data.forEach(({position, name, epochDate, satnum, orbitType, isManned}, i) => {
          let iconSize = 6.5;
          let iconUrl = './cesiumAssets/Models/circle' + iconUrlEnd;
          if (isManned) {
            iconUrl = './cesiumAssets/Models/manned.png'; //doesn't need url end.
            iconSize = 24;
          } else if (orbitType === 1) {
            iconSize = 20;
            iconUrl = './cesiumAssets/Models/triangle' + iconUrlEnd;
          } else if (orbitType === 2) {
            iconSize = 16;
            iconUrl = './cesiumAssets/Models/cross' + iconUrlEnd;
          }

          const entity = viewer.current.entities.add({
            id: `${category.name}-${satnum}-${i}`,
            epochDate,
            allPositions: position,
            position,
            baseColor: category.color ? category.color : new Cesium.Color.fromBytes(15,98,254,255),
            needsDarkText: category.needsDarkText,
            originalIconSize: iconSize,
            orbitType: orbitType,
            billboard: {
              image: iconUrl,
              height: iconSize,
              width: iconSize,
              scaleByDistance: new Cesium.NearFarScalar(2e7, 1.9, 9e7, 1),
              translucencyByDistance: new Cesium.NearFarScalar(2e7, 1, 9e7, 0.8),
            },
            name: name,
            satnum,
            categoryName: category.name,
            show: category.visible,
          });

          entity.position.setInterpolationOptions({
            interpolationDegree,
            interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
          });

          points.push(entity);
        });
      });

      // Animate
      viewer.current.clock.onTick.addEventListener((clock) => {
        if (clock.multiplier === 0) {
          return;
        }

        // Update positions and clocks of each entity separately
        const pointsLen = points.length;

        if (Math.abs(Cesium.JulianDate.toDate(clock.currentTime).getTime() - Cesium.JulianDate.toDate(clock.startTime).getTime()) > 4800000) {
          //Current limit is 80 min propagation
          //Restarts after 80 min
          viewer.current.clock.currentTime = viewer.current.clock.startTime.clone();
        }

        for (let i = 0; i < pointsLen; i++) {
          const entity = points[i];
          if (entity.isShowing) {
            if (entity.allPositions) {
              entity.position = entity.allPositions.getValue(viewer.current.clock.currentTime);
            }
          }
        }
      });

      // Remove double clicker
      viewer.current.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      // Create a screen space event handler to handle click events on the canvas
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.current.scene.canvas);
      
      handler.setInputAction((click) => {
        const pickedObject = viewer.current.scene.pick(click.position);
        // If the clicked object is a polyline, remove it
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
          if (Cesium.defined(pickedObject.id.name)) {
            handleSelectEntity(pickedObject, {
              Color: helperFunctionsRef.current.Color,
              LabelGraphics: helperFunctionsRef.current.LabelGraphics,
              Cartesian2: helperFunctionsRef.current.Cartesian2,
              Cartesian3: helperFunctionsRef.current.Cartesian3,
              LabelStyle: helperFunctionsRef.current.LabelStyle,
              VerticalOrigin: helperFunctionsRef.current.VerticalOrigin
            });
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // Event listener to turn off loader after the scene renders for the first time
      const turnOffLoader = () => {
        viewer.current.scene.postRender.removeEventListener(turnOffLoader);
        setTimeout(() => {
          setLoadingStatus(false);
        }, 500);
      };

      // Start animation
      viewer.current.clock.canAnimate = true;
      viewer.current.clock.shouldAnimate = initialClockMultiplier !== 0;

      setObjectCategories(initialObjectCategories);

      viewer.current.scene.postRender.addEventListener(turnOffLoader);
      viewer.current.camera.flyHome(0.5); // set initial camera position
    });

  }, [isLoaded, propagateCategories, setLoadingStatus, startDate, fontIsLoaded, handleSelectEntity]);

  return (
    
      <>
        <div className={`${styles['left-sidebar-container']} ${sidemenuOpened ? styles['left-sidebar-container-active'] : ''}`}>
          <div className={styles['left-sidebar-contents']}>
            <TimeControls
              handleMultiplierChange={changeMultiplier}
              currentClock={viewer.current.clock}
              helperFunctions={{JulianDate: helperFunctionsRef.current ? helperFunctionsRef.current.JulianDate : null}}
              resetClock={resetClock}
              startDate={startDate}
            />
            <div className={styles['map-type-container']}>
              <Toggle
                aria-label="Toggle between 3D vs 2D"
                id="d-toggle"
                labelText="View in 3D"
                toggled={threeDView}
                onToggle={(checked) => setThreeDView(checked)}
              />
            </div>
            <Options
              objectCategories={objectCategories}
              toggleCategoryVisibility={toggleCategoryVisibility}
              toggleOrbitVisibility={toggleOrbitVisibility}
              orbitCategories={orbitCategories}
            />
            <div className={styles['divider']}></div>
            {
            // <div className={styles['details-container']}>
            //   <label className="cds--label">Color legend</label>
            //   <UnorderedList className={styles['legend-container']}>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/square.png" alt="Legend item for Active objects" /> Active objects
            //     </ListItem>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/square_debris.png" alt="Legend item for Debris objects" /> Debris objects
            //     </ListItem>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/square_unknown.png" alt="Legend item for Uncategorized objects" /> Uncategorized objects
            //     </ListItem>
            //   </UnorderedList>
            // </div>
            // <div className={styles['details-container']}>
            //   <label className="cds--label">Shape legend</label>
            //   <UnorderedList className={styles['legend-container']}>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/circle.png" alt="Legend item for LEO" /> {`Low earth orbit (LEO)`}
            //     </ListItem>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/triangle.png" alt="Legend item for MEO" /> {`Medium earth orbit (MEO)`}
            //     </ListItem>
            //     <ListItem className={styles['legend-list-item']}>
            //       <img src="./cesiumAssets/Models/cross.png" alt="Legend item for GEO" /> {`Geosynchronous orbit (GEO)`}
            //     </ListItem>
            //   </UnorderedList>
            // </div>
            }
            <div className={styles['details-container']}>
              <label className="cds--label">About</label>
              <UnorderedList>
                <ListItem>
                  Data source: Space-Track General Perbutation TLEs
                </ListItem>
                <ListItem>
                  {`Orbits propagated with SPG4 via satellite.js`}
                </ListItem>
                <ListItem>
                  3D visualization powered by Cesium
                </ListItem>
                <ListItem>
                  Basemap provided by Mapbox
                </ListItem>
                <ListItem>
                  UI components by IBM
                </ListItem>
                <ListItem>
                  Orchestrated by Hyun
                </ListItem>
              </UnorderedList>
            </div>
          </div>
        </div>

        <main className={`${styles["content"]} ${sidemenuOpened ? styles['content-active'] : ''}`}>
          <div className={styles['menu-icon-toggle']}>
            <IconButton
              kind="secondary"
              label="Hide sidemenu"
              size="md"
              
              onClick={() => setSidemenuOpened(!sidemenuOpened)}
            >
              {sidemenuOpened ? <ChevronLeft size={16} /> : <Menu size={16} />}
            </IconButton>
          </div>
          <div
            id="cesium-container"
            className={`
              fullSize
            `}
          ></div>
          <div className={styles['search-button-container']}>
            <Button
              label={isSearchOpen ? 'Close data table' : 'Open data table'}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              kind="secondary"
              renderIcon={isSearchOpen ? Close : SearchLocate}
              size="md"
            >
              {isSearchOpen ? 'Hide data explorer' : 'Open data explorer'}
            </Button>
          </div>
          <div className={`${styles['search-container']} ${isSearchOpen ? styles['search-active'] : null}`}>
            <Search
              entities={!viewer.current?.entities?.values?.length
                ? []
                : viewer.current.entities.values
                  .filter((entity) => entity.billboard)
                  .map((entity) => ({
                    id: entity.id,
                    name: entity.name.toLowerCase(),
                    categoryName: entity.categoryName.toLowerCase(),
                    satnum: entity.satnum,
                    epochDate: entity.epochDate,
                    visible: entity.isShowing
                  }))
              }
              trackEntity={trackEntity}
              selectedEntities={selectedEntities}
              selectEntity={selectEntity}
              setIsSearchOpen={setIsSearchOpen}
            />
          </div>
          
          <div className={styles['selected-entities-button-container']}>
            {
              selectedEntities.length ?
                <div>
                <Button
                  size="md"
                  label="Clear selection"
                  onClick={() => setIsSelectedEntitiesListOpen(v => !v)}
                  kind="secondary"
                  renderIcon={isSelectedEntitiesListOpen ? Close : SelectWindow}
                >
                  {isSelectedEntitiesListOpen ? 'Close Selection controls' : 'Open Selection controls'}
                </Button></div> : null
            }
            {
              isTracking ? 
              <div><Button size="md" label="Reset camera view" onClick={resetCamera} kind="secondary" renderIcon={Globe}>Reset camera</Button></div> : null
            }
          </div>
          <div className={`${styles['selected-entities-container']} ${isSelectedEntitiesListOpen ? styles['selected-entities-list-active'] : null}`}>
              <SelectedEntitiesList
                  selectedEntities={selectedEntities.map(sE => {
                    return {
                      ...sE,
                      categoryName: sE.categoryName.toLowerCase(),
                      name: sE.name.toLowerCase()
                    }
                  })}
                  unselectEntities={(entities) => {
                    //This is to handle Unselect from table.
                    let shouldUntrack = false;
                    entities.forEach(ent => {
                      const entity = viewer.current.entities.getById(ent.id);
                      handleSelectEntity({id: entity}, {
                        Color: helperFunctionsRef.current.Color,
                        LabelGraphics: helperFunctionsRef.current.LabelGraphics,
                        Cartesian2: helperFunctionsRef.current.Cartesian2,
                        Cartesian3: helperFunctionsRef.current.Cartesian3,
                        LabelStyle: helperFunctionsRef.current.LabelStyle,
                        VerticalOrigin: helperFunctionsRef.current.VerticalOrigin,
                      });
                      if (ent.id === isTracking) {
                        shouldUntrack = true;
                      }
                    })
                    if (shouldUntrack) trackEntity(undefined);
                  }}
                  clearExtraEntities={clearExtraEntities}
                  trackEntity={trackEntity}
              />
          </div>
          <div className={styles['notification-container']}>
            {
              failMessage.catname && failMessage.satnum ? 
              <ToastNotification
                lowContrast
                subtitle={`Enable ${failMessage.catname} in "Visible object types" to track and select ${failMessage.satnum}`}
                timeout={0}
                title="Unable to track & select"
              /> : null
            }
          </div>
        </main>
      </>
      
    
  );
};

export default CesiumView;
