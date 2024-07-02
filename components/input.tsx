import {Box} from "@mui/material";
import {InputProps} from "@/types/table";

export const Input = ({label, errors, onChange}: InputProps) => {
    return (
        <Box mb={2}>
            <Box mb={1}>
                <span>{label}</span>
            </Box>
            <Box>
                <input type="text" className={errors.length ? 'error' : ''} onChange={onChange} />
            </Box>
            <Box height="1rem" sx={{color: 'red'}}>
                {
                    errors.map((error, index) => <span key={index}>{error}</span>)
                }
            </Box>
        </Box>
    )
}