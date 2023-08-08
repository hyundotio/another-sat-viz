// utils
import { memo, useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilterValue2 } from "@/store/reducers/satellitesSlice";
import { Reset } from '@carbon/icons-react';
import { Pagination, PaginationNav, DataTable, TableContainer, Table, TableHead, TableRow, TableToolbarSearch, Button, TableHeader, TableBody, TableCell, TableBatchActions, TableToolbar, TableBatchAction, TableToolbarContent, TableToolbarMenu, TableToolbarAction } from '@carbon/react';
const getUTCDate = require("@/utils/shared/getUTCDate");

// components and styles
import styles from "./index.module.scss";

const SelectedEntitiesList = ({ selectEntity, trackEntity, selectedEntities, clearExtraEntities }) => {
  const itemsChangeCount = 30;
  const dispatch = useDispatch();
  const searchFilterValue = useSelector((state) => state.satellites.searchFilterValue2);
  const showingSearchItemsCount = useSelector((state) => state.satellites.showingSearchItemsCount2);
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
    debounce((value) => dispatch(setSearchFilterValue2(value)), 300),
    [dispatch]
  );
  
  const handleInputChange = (e) => {
    setInputSearchValue(e.target.value); // this value is used only for input
    handleSearchChange(e.target.value.trim().toLowerCase());
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
      header: 'Track object',
      key: 'focus_id'
    }
  ];
  
  const renderItems = () => {
    let items = selectedEntities;
    
    if (searchFilterValue) {
      items = selectedEntities.filter((item) =>
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
      key="selected-entities-list"
      className={`
        ${styles["selected-entities-list-container"]}
      `}
    >
      <DataTable rows={tableItems} headers={headerData} isSortable id="selected-entities-list">
        {({
          rows,
          headers,
          getHeaderProps,
          getBatchActionProps
        }) => (
          <TableContainer title="Selected objects">
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  id="selected-entities-list-search"
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onChange={handleInputChange}
                />
                <Button
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onClick={() => {clearExtraEntities(); trackEntity(undefined);}}
                  kind="secondary"
                  renderIcon={Reset}
                >
                  Clear selection & orbits
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table className={styles["selected-entities-list-results-container"]} size='xs'>
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
                                    <button className="cds--link" onClick={() => {trackEntity(cell.value.id);}}>
                                      Track object
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

export default memo(SelectedEntitiesList);
