// import {createFileRoute} from '@tanstack/react-router';  TODO: Figure this out
import {TextField, Stack, Autocomplete} from '@mui/material';
// import z from 'zod';  TODO: Figure this out
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import * as React from 'react';
import {useState, SyntheticEvent} from 'react';

export type Row2 = {

    id: number,

    /**
     * name.length must be > 1
     */
    name: string


    extraInfo?: string
}

// TODO: Figure this out
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


const fetchMachinesLocs = async () => {
    const response: AxiosResponse<Row2[]> = await axios.get<Row2[]>('/bo/api/inv/machineLocs.json');
    return response.data
};

const fetchInspectionLocs = async () => {
    const response: AxiosResponse<Row2[]> = await axios.get<Row2[]>('/bo/api/inv/inspectionLocs.json');
    return response.data
};

const fetchTeslaItems = async () => {
    const response: AxiosResponse<Row2[]> = await axios.get<Row2[]>('/bo/api/inv/teslaItems.json');
    return response.data
};


function RouteComponent() {

    const [machineLoc, setMachineLoc] = useState<Row2 | null>(null);
    const [item, setItem] = useState<Row2 | null>(null);
    const [inspectionLoc, setInspectionLoc] = useState<Row2 | null>(null);




    const machineLocs = useQuery({queryKey: ['machinesLocs'], queryFn: fetchMachinesLocs});
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
        const row: Row2 | null= option as Row2 | null;
        setItem(row);
    };

    return <Stack spacing={2}>


        <Autocomplete
            getOptionLabel = {getOptionLabel}
            disablePortal
            options={machineLocs.data ?? []}
            sx={{width: 300}}
            value={machineLoc}
            onChange={onMachineLocChange}
            renderInput={(params) => <TextField {...params} label="Machine"/>}
        />

        <Autocomplete
            getOptionLabel = {getOptionLabel}
            disablePortal
            options={teslaItems.data ?? []}
            sx={{width: 300}}
            value={item}
            onChange={onItemChange}
            renderInput={(params) => <TextField {...params} label="Part Number"/>}
        />

        <Autocomplete
            getOptionLabel = {getOptionLabel}
            disablePortal
            options={inspectionLocs.data ?? []}
            sx={{width: 300}}
            value={inspectionLoc}
            onChange={onInspectionLocChange}
            renderInput={(params) => <TextField {...params} label="Inspection Station"/>}
        />


    </Stack>;


}
