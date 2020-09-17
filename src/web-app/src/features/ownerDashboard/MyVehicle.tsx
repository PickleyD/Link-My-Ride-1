import React, { useContext, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Web3Context } from "../web3"
import { Typography } from "@material-ui/core"
import { NoVehicle } from "./NoVehicle"
import { Vehicle } from "./Vehicle"

export const MyVehicle = () => {

    const { linkMyRideContract, web3 } = useContext(Web3Context)

    const [myVehicle, setMyVehicle] = useState<Car>()

    const getMyVehicle = useCallback(async () => {

        const addresses = await web3.eth.getAccounts()

        const vehicle = await linkMyRideContract.methods.getVehicle(addresses[0]).call()

        if (vehicle[0] !== "0") {
            setMyVehicle({
                id: vehicle[0],
                address: vehicle[1],
                apiTokenHash: vehicle[2],
                baseHireFee: vehicle[3],
                bondRequired: vehicle[4],
                currency: vehicle[5],
                model: vehicle[6],
                description: vehicle[7],
                lat: 0,
                lng: 0
            })
        }
    }, [linkMyRideContract, web3])

    useEffect(() => {
        if (web3 && linkMyRideContract) {
            getMyVehicle()
        }
    }, [web3, linkMyRideContract, getMyVehicle])

    return <Wrapper>
        <Heading variant="h4">My vehicle:</Heading>
        {
            myVehicle ? <Vehicle car={myVehicle} /> : <NoVehicle />
        }
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(6)};
`

const Heading = styled(Typography)`
    color: ${({ theme }) => theme.palette.common.white};
`