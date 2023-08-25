import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import OrFilterPanel from './OrFilterPanel';
import DataContext from '../DataContext.js';

const MyGrid = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const dataContext = React.useContext(DataContext);
    function myCustomSumFunction(values) {
        var sum = 0;
        values.forEach( function(value) {sum += Number(value);} );
        return sum;
    }
    const [columnDefs, setColumnDefs] = useState([
      { field: 'ID', maxWidth: 80 },
        { field: 'Sale Account', minWidth: 100 },
        { field: 'Customer Name', minWidth: 150 },
        { field: 'Satus', maxWidth: 150 },
        { field: 'Bandwidth', aggFunc: myCustomSumFunction, minWidth: 100 },
        { field: 'Update', aggFunc: myCustomSumFunction },
        { field: 'Total Bandwidth', aggFunc: myCustomSumFunction },
        { field: 'Business Type', maxWidth: 200  },
        { field: 'IP', maxWidth: 80 },
        { field: 'OA Serial'},
        { field: 'Service Date', maxWidth: 150 },
        { field: 'Remark', maxWidth: 150 }
    ]);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };
console.log(dataContext.orFilteredRowData.ID)
    return (

        <div style={{ width: '100%', height: '100vh' }}>
          <div><pre>{dataContext.orFilteredRowData.ID}</pre></div>
            <div
                id="myGrid"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        filter: true,
                        filterParams: {
                            newRowsAction: 'keep'
                        },
                        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
                    }}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    rowData={dataContext.orFilteredRowData}
                    immutableData={true}
                    getRowNodeId={data => data.id}
                    groupIncludeFooter={true}
                    groupIncludeTotalFooter={true}
                    animateRows={true}
                    sideBar={{
                      toolPanels: [
                          {
                              id: 'or-filtering',
                              labelDefault: 'OR-filtering',
                              labelKey: 'or-filtering',
                              iconKey: 'filter',
                              toolPanel: 'orFilterPanel',
                              toolPanelParams: {
                                  columnDefs: columnDefs,
                              }
                          }

                      ],
                      defaultToolPanel: 'or-filtering',
                  }}
                    frameworkComponents={{ orFilterPanel: OrFilterPanel }}
                />
            </div>
        </div>
    );
};

export default MyGrid;
