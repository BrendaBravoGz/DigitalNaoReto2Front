import React, { useState,useRef, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Grid, ButtonBase} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100vh',
  },
  header: {
    backgroundColor: '#252525',
    width: '100%',
    flex: 'none',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  menuItem:{
      backgroundColor:"white"
  },
  menuItemText: {
    marginTop: theme.spacing(1),
    fontSize: 16,
    textTransform:'none'
  },
  customIcon: {
    fontSize: 60,
    color: 'black',
  },
  logo: {
    width: 100,
  },
  uploadButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(2),
    border: '2px dashed #ccc',
    borderRadius: theme.spacing(1),
  },
  uploadIcon: {
    fontSize: 60,
    color: theme.palette.primary.main,
  },
  uploadText: {
    marginTop: theme.spacing(1),
    fontSize: 16,
    textTransform: 'none',
  },
}));


const SaludoScreen = ({ route, navigation }) => {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [editableRows, setEditableRows] = useState();
  const Logo = require('../Imagen.png');

  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };  
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExcelData(data.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleEditClick = (rowKey) => {
    setEditableRows((prevState) => ({
      ...prevState,
      [rowKey]: true,
    }));
  };
  
  const handleUpdateClick = async (rowKey) => {
    const updatedData = excelData[rowKey];
  
    try {
      const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: updatedData.filename,
          updatedData: updatedData.data
        })
      });
  
      if (response.ok) {
        // Datos actualizados correctamente
        // Realiza las acciones necesarias, como mostrar un mensaje de éxito o actualizar la interfaz de usuario
      } else {
        // Error al actualizar los datos
        // Maneja el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de actualización', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  
    // Luego, desactiva el modo de edición de la fila
    setEditableRows((prevState) => ({
      ...prevState,
      [rowKey]: false,
    }));
  };
  
  const handleQuantityChange = (event, rowKey) => {
    const { value } = event.target;
    // Validar que solo se ingresen números
    if (/^\d*$/.test(value)) {
      setExcelData((prevState) => ({
        ...prevState,
        [rowKey]: {
          ...prevState[rowKey],
          'Quantity Ordered': value,
        },
      }));
    }
  };

  useEffect(() => {
    // Guardar datos en localStorage cada vez que se actualice el estado excelData
    const saveDataToStorage = () => {
      try {
        localStorage.setItem('excelData', JSON.stringify(excelData));
      } catch (error) {
        console.error('Error al guardar los datos en localStorage', error);
      }
    };
    saveDataToStorage();
  }, [excelData]);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" className={classes.headerText}>
        <img src={Logo} alt="Logo" className={classes.logo} />
          ¡Hola, {name}!
        </Typography>
      </div>
      <div className={classes.menu}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12}>
          <Grid container direction="column" alignItems="center" >

            <ButtonBase
              className={classes.uploadButton}
            >
            <Typography className={classes.menuItemText}>
              Carga de Información
            </Typography>
            <CloudUpload className={classes.customIcon}/>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />

              <Button
                color="primary"
                onClick={handleFileUpload}
              >
                Subir archivo
              </Button>
            </ButtonBase>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
          <ButtonBase
              className={classes.uploadButton}
              onClick={handleButtonClick}
            >
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Edit className={classes.customIcon}/>
                </Grid>
                <Grid item>
                  <Typography className={classes.menuItemText}>
                    Modificación de Información
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
          </Grid> */}
        </Grid>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>Month Description Effective From EFFF</TableCell>
              <TableCell>Business Unit</TableCell>
              <TableCell>Effective From</TableCell>
              <TableCell>Week Number Effective From EFFF</TableCell>
              <TableCell>Planned / Released (RF-GA)</TableCell>
              <TableCell>FirmWO</TableCell>
              <TableCell>PlannedWO</TableCell>
              <TableCell>Daily Capacity (RF-GA)</TableCell>
              <TableCell>Weekly Capacity (RF-GA)</TableCell>
              <TableCell>Mothly Capacty (RF-GA)</TableCell>
              <TableCell>Request Date F553312.DRQJ</TableCell>
              <TableCell>Rate/Hour (RF-GA)</TableCell>
              <TableCell>Primary UOM/Hour</TableCell>
              <TableCell>Short Item No F553312.ITM</TableCell>
              <TableCell>2nd Item Number - LITM</TableCell>
              <TableCell>Work Order Quantity</TableCell>
              <TableCell>Quantity Ordered</TableCell>
              <TableCell>Work Order No</TableCell>
              <TableCell>WO Status</TableCell>
              <TableCell>Type of Routing</TableCell>
              <TableCell>WO Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(excelData).map((key) => (
              <TableRow key={key} component={Link} to={`/detalle/${key}`}>
                <TableCell>{excelData[key]['Branch  F553007.MMCU']}</TableCell>
                <TableCell>{excelData[key]['Month Description Effective From EFFF']}</TableCell>
                <TableCell>{excelData[key]['Business Unit F553007.MCU']}</TableCell>
                <TableCell>{excelData[key]['Effective From F553007.EFFF']}</TableCell>
                <TableCell>{excelData[key]['Week Number Effective From EFFF']}</TableCell>
                <TableCell>{excelData[key]['Planned / Released (RF-GA)']}</TableCell>
                <TableCell>{excelData[key]['FirmWO']}</TableCell>
                <TableCell>{excelData[key]['PlannedWO']}</TableCell>
                <TableCell>{excelData[key]['Daily Capacity (RF-GA)']}</TableCell>
                <TableCell>{excelData[key]['Weekly Capacity (RF-GA)']}</TableCell>
                <TableCell>{excelData[key]['Mothly Capacty (RF- GA)']}</TableCell>
                <TableCell>{excelData[key]['Request Date F553312.DRQJ']}</TableCell>
                <TableCell>{excelData[key]['Rate/Hour (RF-GA)']}</TableCell>
                <TableCell>{excelData[key]['Primary UOM/Hour']}</TableCell>
                <TableCell>{excelData[key]['Short Item No F553312.ITM']}</TableCell>
                <TableCell>{excelData[key]['2nd Item Number - LITM']}</TableCell>
                <TableCell>{excelData[key]['Work Order Quantity']}</TableCell>
                <TableCell>{excelData[key]['Quantity Ordered ']}</TableCell>
                <TableCell>{excelData[key]['Work Order No']}</TableCell>
                <TableCell>{excelData[key]['WO Status']}</TableCell>
                <TableCell>{excelData[key]['Type of Routing']}</TableCell>
                <TableCell>{excelData[key]['WO Start Date']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SaludoScreen;
