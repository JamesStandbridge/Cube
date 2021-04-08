import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { format } from "date-fns";

import { Link, Redirect } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";

import MUILink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import UtilisateursRepository from '../../../services/ORM/repository/UtilisateursRepository'

const Utilisateurs = ({AuthHandler, dispatch, UserListHandler}) => {
    const [ loading, setLoading ] = useState(false)
    const utilisateurs = UserListHandler.list
    console.log(utilisateurs)
    const fetchUsers = async () => {
        const res = await UtilisateursRepository.getUtilisateurList(AuthHandler.token)
        
        dispatch({
            type: "REPLACE_USER_LIST",
            list: res.data["hydra:member"]
        })
    }

	useEffect(() => {
        if(UserListHandler.isUpdated === false || UserListHandler.list.length === 0) {
            fetchUsers()
        }
	}, [UserListHandler.isUpdated])


    const handleChangeActivationCompte = (userID) => {
        UtilisateursRepository.updateUserEnabled(userID, AuthHandler.token)
        dispatch({type: "RESET_UPDATE_USER_LIST"})
    }


    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "firstname",
            label: "Prénom",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "lastname",
            label: "Nom",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            {value.enabled ? (
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Désactiver"
                                    onClick={() => handleChangeActivationCompte(value.id)}
                                    icon={<PowerSettingsNewIcon />}
                                />  
                            ) : (
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Activer"
                                    onClick={() => handleChangeActivationCompte(value.id)}
                                    icon={<PowerSettingsNewIcon />}
                                />                              
                            )}
                        </div>
                    )
                },
            }
        }
    ];

    const options = {
        filterType: "dropdown",
        customToolbarSelect: () => {},
        textLabels: {
            body: {
                noMatch: "Aucun utilisateur inscrit",
                toolTip: "Trier",
                columnHeaderTooltip: (column) => `Trier par ${column.label}`,
            },
            pagination: {
                next: "Page suivante",
                previous: "Page précédente",
                rowsPerPage: "Lignes par page:",
                jumpToPage: "Page:",
                displayRows: "of",
            },
            toolbar: {
                search: "Recherche",
                downloadCsv: "Télécharger CSV",
                print: "Imprimer",
                viewColumns: "Montrer colonnes",
                filterTable: "Filter la table",
            },
            filter: {
                all: "Tout",
                title: "FILTERS",
                reset: "REINITIALISER",
            },
            viewColumns: {
                title: "Montrer colonnes",
                titleAria: "Cacher colonnes",
            },
            selectedRows: {
                text: "ligne(s) sélectionnée(s)",
                delete: "Supprimer",
                deleteAria: "Supprimer les lignes sélectionnées",
            },
        },
    };

    const dataTableFormat = () => {
        let newTableData = []
        utilisateurs.map(user => {

            let role = "Citoyen"
            if(user.roles.includes("ROLE_SUPER_ADMIN")) role = "Super-administrateur"
            else if(user.roles.includes("ROLE_ADMIN")) role = "Administrateur"   
            else if(user.roles.includes("ROLE_MODERATOR")) role = "Modérateur"

            const newUser = {
                id: user.id,
                role: role,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                actions: user,
            }
            newTableData.push(newUser)
        })

        return newTableData
    }

    const tableData = dataTableFormat();

	return (
        <div className={"muiDatatableDiv"} style={{ position: "relative" }}>
            {loading && loadingComponent}
            <MUIDataTable
              title={"Utilisateurs"}
              data={tableData}
              columns={columns}
              options={options}
            />
        </div>
	)
}

const loadingComponent = (
    <div
        style={{
            position: "absolute",
            zIndex: 110,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255,0.8)"
        }}
    >
        <CircularProgress
            size={64}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "#3aafa0"
            }}
        />
    </div>
)

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Utilisateurs);