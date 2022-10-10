import Box from "@mui/material/Box";
import { DataGrid, deDE, GridColDef } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

import React, { useEffect, useState } from "react";

import { dataGridStyle } from "../../src/theme";
import { Typography } from "@mui/material";
import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import { NextPageContext } from "next";

export default ExampleDataView;

export function ExampleDataView({ ssrData, nonce }: { ssrData: { id: number; message: string }[]; nonce: string }) {
    const [pageSize, setPageSize] = useState<number>(15);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([] as { id: number; message: string }[]);
    const [error, setError] = useState<undefined | boolean | string>(undefined);

    function load() {
        setLoading(false);
        setData(ssrData)
    }

    useEffect(() => {
        load();
    }, []);

    const columns: GridColDef[] = [{ field: "message", headerName: "Message", width: 280 },
    ];

    console.log(nonce);

    return <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}><h1>Example Datagrid</h1>
        <DataGrid columns={columns}
            pageSize={pageSize}
            sx={dataGridStyle}
            nonce={nonce}
            components={{ LoadingOverlay: LinearProgress }}
            componentsProps={{ loadingOverlay: { color: "inherit" } }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 15, 25, 50, 100]}
            pagination rows={data}></DataGrid>
    </Box>;
}

export const getServerSideProps = gsspWithNonce(async (ctx) => {
    return { props: { ssrData: [{ id: 1, message: "Hi" }] } };
});
