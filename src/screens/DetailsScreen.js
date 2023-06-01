import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffff',
    minHeight: '100vh',
    padding: theme.spacing(4),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    color: '#333',
    fontSize: '24px',
    letterSpacing: '1px',
  },
  fieldContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: theme.spacing(1),
  },
  datePickerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    backgroundColor: '#ffff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: theme.spacing(1),
  },  selectedDate: {
    fontSize: '14px',
    color: '#555',
  },
  datePicker: {
    border: 'none',
    marginLeft: theme.spacing(1),
    fontSize: '14px',
    outline: 'none',
  },
  fieldName: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
    minWidth: '200px',
  },
  fieldValue: {
    flexGrow: 1,
    fontSize: '14px',
    color: '#555',
  },
  editIcon: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    color: '#999',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#333',
      transform: 'scale(1.1)',
    },
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s',
  },

}));

const DetalleScreen = () => {
  const { key } = useParams();
  const classes = useStyles();
  const [datosAlmacenados, setDatosAlmacenados] = useState(null);
  const [editableRows, setEditableRows] = useState({});
  const [editing, setEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantityOrdered, setQuantityOrdered] = useState(datosAlmacenados?.['Quantity Ordered'] || '');
  const rowData = datosAlmacenados ? datosAlmacenados.find(row => row.id === parseInt(key)) : null;

  useEffect(() => {
    // Obtener los datos almacenados desde localStorage al cargar la pantalla
    const obtenerDatosAlmacenados = () => {
      try {
        const datos = localStorage.getItem('excelData');
        if (datos !== null) {
          setDatosAlmacenados(JSON.parse(datos));
        }
      } catch (error) {
        console.error('Error al obtener los datos desde localStorage', error);
      }
    };
    obtenerDatosAlmacenados();
  }, []);
  const handleEditClick = (rowKey) => {
    setEditing(true);
    setEditableRows((prevState) => ({
      ...prevState,
      [rowKey]: true,
    }));
  };
  const handleQuantityChange = (event) => {
    const { value } = event.target;
    setQuantityOrdered(value);
  };
  const handleQuantityKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
  
    // Permite solo caracteres numéricos y teclas especiales como retroceso o flechas
    const regex = /[0-9\b]/;
  
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };
    console.log(rowData,"si se pasan")

  
  const excelNumberToDate = (excelNumber) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const date = new Date((excelNumber - 2) * millisecondsPerDay + Date.UTC(1900, 0, 1));
    return date.toLocaleDateString();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Detalle del elemento
      </Typography>

      {rowData && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldName}>2nd Item Number - LITM:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['2nd Item Number - LITM']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Branch F553007.MMCU:</Typography>
              <Typography variant="body2">{rowData['Branch  F553007.MMCU']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Business Unit F553007.MCU:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Business Unit F553007.MCU']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Daily Capacity (RF-GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Daily Capacity (RF-GA)']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Effective From F553007.EFFF:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Effective From F553007.EFFF']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>FirmWO:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['FirmWO']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Month Description Effective From EFFF:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Month Description Effective From EFFF']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Mothly Capacty (RF- GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Mothly Capacty (RF- GA)']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>lanned / Released (RF-GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['lanned / Released (RF-GA)']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Planned / Released (RF-GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Planned / Released (RF-GA)']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>PlannedWO:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['PlannedWO']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Primary UOM/Hour:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Primary UOM/Hour']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Rate/Hour (RF-GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Rate/Hour (RF-GA)']}</Typography>
            </div>

            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Short Item No F553312.ITM:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Short Item No F553312.ITM']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Type of Routing:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Type of Routing']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>WO Start Date:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['WO Start Date']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>WO Status:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['WO Status']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Week Number Effective From EFFF:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Week Number Effective From EFFF']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Weekly Capacity (RF-GA):</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Weekly Capacity (RF-GA)']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Work Order No:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Work Order No']}</Typography>
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Work Order Quantity:</Typography>
              <Typography variant="body2"className={classes.fieldValue}>{rowData['Work Order Quantity']}</Typography>
            </div>

          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.fieldContainer}>
              <Typography variant="body1"className={classes.fieldName}>Quantity Ordered:</Typography>
              <input
                type="text"
                value={editing ? quantityOrdered : rowData['Quantity Ordered '] || ''}
                onChange={(event) => handleQuantityChange(event, 'Quantity Ordered')}
                onKeyPress={handleQuantityKeyPress}
                readOnly={!editableRows['Quantity Ordered']}
              />
              <Edit
                className={classes.editIcon}
                onClick={() => handleEditClick('Quantity Ordered')}
              />
            </div>
            <div className={classes.fieldContainer}>
              <Typography variant="body1" className={classes.fieldName}>
                Request Date F553312.DRQJ
              </Typography>
              <div className={classes.datePickerContainer}>
                <Typography variant="body2" className={classes.selectedDate}>
                  {rowData &&
                    rowData['Request Date F553312.DRQJ'] &&
                    excelNumberToDate(rowData['Request Date F553312.DRQJ'])}
                </Typography>
                <DatePicker
                  placeholderText="Selecciona una fecha"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className={classes.datePicker}
                />
                <Edit
                className={classes.editIcon}
              />
              </div>
            </div>
            <Button variant="contained" color="secondary" type="submit" style={{ width: '100%' }}>
            {'Actualizar los datos'}
          </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DetalleScreen;
