// utils
import { memo, useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilterValue, setShowingSearchItemsCount } from "@/store/reducers/satellitesSlice";
import { Add, Subtract } from '@carbon/icons-react';
import { Pagination, DataTable, TableContainer, Table, TableHead, TableRow, TableToolbarSearch, Button, TableHeader, TableBody, TableCell, TableBatchActions, TableToolbar, TableBatchAction, TableToolbarContent, TableToolbarMenu, TableToolbarAction } from '@carbon/react';
const getUTCDate = require("@/utils/shared/getUTCDate");

// components and styles
import styles from "./index.module.scss";

const Search = ({ entities, selectEntity, setIsSearchOpen, selectedEntities, trackEntity }) => {
  const itemsChangeCount = 30;
  const dispatch = useDispatch();
  const searchFilterValue = useSelector((state) => state.satellites.searchFilterValue);
  const showingSearchItemsCount = useSelector((state) => state.satellites.showingSearchItemsCount);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inputSearchValue, setInputSearchValue] = useState("");

  const changePaginationState = (pageInfo) => {
    if (page !== pageInfo.page) {
      setPage(pageInfo.page);
    }
    if (pageSize !== pageInfo.pageSize) {
      setPageSize(pageInfo.pageSize);
    }
  }


  useEffect(() => {
    setInputSearchValue(searchFilterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only set on initialization

  // Debounce search filtering
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    debounce((value) => dispatch(setSearchFilterValue(value)), 300),
    [dispatch]
  );
  
  const handleInputChange = (e) => {
    setInputSearchValue(e.target.value); // this value is used only for input
    handleSearchChange(e.target.value.trim().toLowerCase());
  };

  const increaseShowingCount = () => {
    dispatch(setShowingSearchItemsCount(showingSearchItemsCount + itemsChangeCount));
  };

  const decreaseShowingCount = () => {
    const newCount = showingSearchItemsCount - itemsChangeCount;

    // Do not allow to set a very low amount
    if (newCount > 20) {
      dispatch(setShowingSearchItemsCount(newCount));
    }
    if (page * pageSize > newCount) {
      setPage(1);
    }
  };

  const headerData = [
    {
      header: 'Common name',
      key: 'common_name'
    },
    {
      header: 'NORAD ID',
      key: 'norad_id'
    },
    {
      header: 'Object type',
      key: 'object_type'
    },
    {
      header: 'TLE Epoch',
      key: 'tle_epoch'
    },
    {
      header: 'View object',
      key: 'focus_id'
    }
  ];
  
  const renderItems = () => {
    let items = entities;
    
    if (searchFilterValue) {
      items = entities.filter((item) =>
        item.name.includes(searchFilterValue)
        || item.categoryName.includes(searchFilterValue)
        || item.satnum.includes(searchFilterValue)
      );
    }

    return items
      .sort((a, b) => b.epochDate - a.epochDate)
      .slice(0, showingSearchItemsCount)
      .map((entity) => {
        return entity ? {
          common_name: entity.name,
          norad_id: entity.satnum,
          object_type: entity.categoryName,
          tle_epoch: getUTCDate(entity.epochDate),
          focus_id: {
            id: entity.id,
            selected: selectedEntities.some(ent => ent.id === entity.id)
          },
          id: entity.id
        } : null
      });
  };

  const tableItems = renderItems();

  return (
    <div
      className={`
        ${styles["search-container"]}
      `}
      key="catalog-explorer"
    >
      <DataTable rows={tableItems} headers={headerData} isSortable id="catalog-explorer">
        {({
          rows,
          headers,
          getHeaderProps,
          getBatchActionProps
        }) => (
          <TableContainer title="Satellite catalog data explorer">
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  id="catalog-explorer-search"
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onChange={handleInputChange}
                />
                <Button
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onClick={decreaseShowingCount}
                  kind="tertiary"
                  renderIcon={Subtract}
                >
                  Show less data
                </Button>
                <Button
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onClick={increaseShowingCount}
                  kind="secondary"
                  renderIcon={Add}
                >
                  Show more data
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table className={styles["search-results-container"]} size='xs'>
              <TableHead>
                <TableRow>
                  {headers.map((header) => {
                    return (
                      <TableHeader key={`header-${header.key}`} {...getHeaderProps({ header, isSortable: header.key !== 'focus_id'})}>
                        {header.header}
                      </TableHeader>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice((page-1)*pageSize).slice(0, pageSize).map((row) => (
                  row ? 
                  <TableRow key={row.id}>
                    {
                      row.cells.map((cell) => {
                        if (cell && cell.info && cell.info.header && cell.info.header === 'focus_id') {
                          return  <TableCell key={cell.id}>
                                    <button className="cds--link" onClick={() => {
                                      if (cell.value.selected) {
                                        trackEntity(undefined);
                                      } else {
                                        setIsSearchOpen(false);
                                      }
                                      selectEntity(cell.value.id);
                                    }}>
                                      {cell.value.selected ? 'Unselect object' : 'Track and select object'}
                                    </button>
                                  </TableCell>
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>
                      })
                    }
                  </TableRow> : null
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <Pagination
        onChange={changePaginationState}
        page={page}
        pageSize={pageSize}
        pageSizes={[10]}
        totalItems={tableItems.length}
      />
    </div>
  );
};

export default memo(Search);
