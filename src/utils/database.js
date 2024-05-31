import { createClient } from "@supabase/supabase-js";

const PROJECT = import.meta.env.VITE_SUPABASE_PROJECT;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(PROJECT, ANON_KEY);

const fetchCampaignList = async (table) => {
    const { data, error } = await supabase.from(table).select();
    if (error) throw Error("Failed !");
    return data;
}

const fetchAllWithdrawals = async (address) => {
    const { data, error } = await supabase.from('withdrawals').select('*').eq('address', address);
    if (error) throw Error("Failed !");
    return data;
}

// table = "countries"
// rows = [
//     { name: 'United States', iso_code: 'US' },
//     { name: 'Canada', iso_code: 'CA' },
// ]
const insertToTable = async (table, rows) => {
    const { data, error } = await supabase.from(table).insert(rows);

    console.log(error)
    if (error) throw Error("Failed !");
    return data;
}


// table = 'countries'
// rows = '{ name: 'New Country Name', iso_code: 'NC' }'
// match = { id: 1 }
const updateTable = async (table, row, match) => {
    console.log(table, row, match)
    const { data, error } = await supabase.from(table).update(row).match(match);
    if (error) throw Error("Failed !");
    return data;
}


export {
    insertToTable,
    fetchCampaignList,
    updateTable,
    fetchAllWithdrawals
}