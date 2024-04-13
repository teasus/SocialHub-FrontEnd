import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserQuery } from '../../Store/Auth/Action';
import { createNewChat } from '../../Store/Chat/Action';

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function Asynchronous() {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [onType, setOnType] = React.useState(false);
    const [onChange, setOnChange] = React.useState("");
    //const [onType, setOnType] = React.useState(false);
    const loading = onType && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                console.log(auth?.search);
                setOptions(auth?.search);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, auth?.search]);

    React.useEffect(() => {
        if (!open) {

            setOptions([]);
        }
    }, [open]);

    const handleSearch = (e) => {
        setOnType(true);
        dispatch(searchUserQuery(e));
        console.log("ee ", e);
    }
    const handleChat = (params) => {
        dispatch(createNewChat(params.id));
        console.log(params);

    }

    return (
        <Autocomplete
            id="add users"
            sx={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setOnType(false);
            }}
            onInputChange={(params) => handleSearch(params.target.value)}

            isOptionEqualToValue={(option, value) => option.fullName === value.fullName}
            getOptionLabel={(option) => option.fullName}
            options={options}
            loading={loading}
            onChange={(event, newValue) => {
                //setValue(newValue);
                handleChat(newValue);
              }}
            
            renderInput={(params) => (
                <TextField id={params.id} 
                    {...params}
                    label="Search User"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
