import { Box, Container } from "@material-ui/core";

export function TabPanelWrapper(props) {
    const {children, value, index, classes, ...other} = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{height: '100%', width: '100%'}}>
                    <Box style={{height: '100%', width: '100%'}}>
                        {children}
                    </Box>
                </div>
            )}
        </div>
    );
  }