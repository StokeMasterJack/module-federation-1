import * as React from 'react';
import {useState, SyntheticEvent} from 'react';
import {CssBaseline, ThemeProvider, createTheme, Stack, Autocomplete, TextField, Typography} from '@mui/material';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import axios from 'axios';
import {QueryClientProvider, useQuery} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/query-core';


// export const Route = createFileRoute('/dave')({
//     validateSearch: z.object({
//         machineLocId: z.number().optional(),
//         itemId: z.number().optional(),
//         inspectionLocId: z.number().optional(),
//     }),
//     component: RouteComponent,
// });


function getOptionLabel(x: Row2 | null): string {
    if (!x) return '';
    return x.name;
}


export type Row2 = {

    id: number,

    /**
     * name.length must be > 1
     */
    name: string


    extraInfo?: string
}


type RowType = 'machineLocs' | 'inspectionLocs' | 'teslaItems';


const fetchRows = async (rowType: RowType) => (await axios.get<Row2[]>(`/bo/api/inv/${rowType}.json`)).data;

const fetchMachineLocs = async () => fetchRows('machineLocs');

const fetchInspectionLocs = async () => fetchRows('inspectionLocs');

const fetchTeslaItems = async () => fetchRows('teslaItems');


const cache = createCache({key: 'mui-seven', prepend: true});
const theme = createTheme();


export const queryClient = new QueryClient();

export default function V7Page() {


    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <InnerDave/>
                </QueryClientProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

function InnerDave() {


    const [machineLoc, setMachineLoc] = useState<Row2 | null>(null);
    const [item, setItem] = useState<Row2 | null>(null);
    const [inspectionLoc, setInspectionLoc] = useState<Row2 | null>(null);


    const machineLocs = useQuery({queryKey: ['machineLocs'], queryFn: fetchMachineLocs});
    const inspectionLocs = useQuery({queryKey: ['inspectionLocs'], queryFn: fetchInspectionLocs});
    const teslaItems = useQuery({queryKey: ['teslaItems'], queryFn: fetchTeslaItems});

    const onMachineLocChange = (e: SyntheticEvent, option: any) => {
        const row: Row2 | null = option as Row2 | null;
        setMachineLoc(row);
    };

    const onInspectionLocChange = (e: SyntheticEvent, option: any) => {
        const row: Row2 | null = option as Row2 | null;
        setInspectionLoc(row);
    };

    const onItemChange = (e: SyntheticEvent, option: any) => {
        const row: Row2 | null = option as Row2 | null;
        setItem(row);
    };


    return <Stack spacing={3} padding={3}>

        <Typography variant="h5">MUI 7</Typography>


        <Autocomplete
            getOptionLabel={getOptionLabel}
            disablePortal
            options={machineLocs.data ?? []}
            sx={{width: 300}}
            value={machineLoc}
            onChange={onMachineLocChange}
            renderInput={(params) => <TextField {...params} label="Machine"/>}
        />

        <Autocomplete
            getOptionLabel={getOptionLabel}
            disablePortal
            options={teslaItems.data ?? []}
            sx={{width: 300}}
            value={item}
            onChange={onItemChange}
            renderInput={(params) => <TextField {...params} label="Part Number"/>}
        />

        <Autocomplete
            getOptionLabel={getOptionLabel}
            disablePortal
            options={inspectionLocs.data ?? []}
            sx={{width: 300}}
            value={inspectionLoc}
            onChange={onInspectionLocChange}
            renderInput={(params) => <TextField {...params} label="Inspection Station"/>}
        />


    </Stack>;

}


//     return <Box p={3}>
//         <Typography variant="h5">MUI 7 Button</Typography>
//         <Button variant="contained" sx={{mt: 2}}>Hello</Button>
//     </Box>;
// }