import React, { useEffect, useState } from 'react';

const Tracking = () => {
    const [selected, setSelected] = useState("byId");
    const [trackingData, setTrackingData] = useState([]);
    let moment = require('moment');

    useEffect(() => {
        const getTrackingData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/traking`);
                const data = await response.json();
                console.log("aaa", data);
                setTrackingData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching tracking data: ', error);
            }
        };
        getTrackingData();
    }, [selected]);

    const handleSelect = event => {
        const { value } = event.target;
        setSelected(value);
    };

    const createTrackingList = (list) => {
        let sortedList;
        switch (selected) {
            case "byId":
                sortedList = list.sort((a, b) => {
                    if (a.action_type > b.action_type) return -1;
                    if (a.action_type < b.action_type) return 1;
                    return 0;
                });
            case 'byAB':
                sortedList = list.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                break;
            case 'byTime':
                sortedList = list.sort((a, b) => {
                    if (a.time > b.time) return -1;
                    if (a.time < b.time) return 1;
                    return 0;
                });
                break;
            case "random":
                sortedList = list.sort(() => 0.5 - Math.random());
                break;
            default:
                sortedList = list;
                break;
        }
        return sortedList.map((arr, index) => (
            <div key={index}>
                {console.log("a",arr)}
                <h5>Task number {index + 1}:</h5>
                <p>{arr.name} {arr.description} at {moment.utc(arr.time).format('DD/MM/YY HH:mm:ss')}</p>
            </div>
        ));
    };

    return (
        <div>
            <h1>Tracking list:</h1>
            <br />
            <div className='select-div'>
                <label>Sort by: </label>
                <select onChange={handleSelect}>
                    <option value="byActionType">By Action Type</option>
                    <option value="byId">By Id of Action</option>
                    <option value="byTime">By the time it happened</option>
                    <option value="byAB">In Alphabetical order</option>
                    <option value="random">Random order</option>
                </select>
            </div>
            <div>{createTrackingList(trackingData)}</div>
        </div>
    );
};

export default Tracking;