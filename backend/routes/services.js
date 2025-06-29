import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import { writeJsonFile } from "../util/writeJsonFile.js";
import toMakeUnique from "../util/sortFunctions/toMakeUnique.js";
import SwitchCase from "../util/sortFunctions/SwitchCase.js";



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const services = await readJsonFile("./data/services.json");
        return res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении services", details: error.message });
    }
})


router.post('/update-available-room', async (req, res) => {
    try {
        const { bookingID, action } = req.body;
        console.log(`2. I am inside deleteBooking`);

        if (!bookingID || !action) {
            return res.status(400).json({ error: "Не передан bookingID или действие (action)" });
        }

        const services = await readJsonFile("./data/services.json");
        const serviceIndex = services.findIndex(service => service.id === bookingID);

        if (serviceIndex === -1) {
            return res.status(404).json({ error: "Номер не найден" });
        }

        const totalNumberOfRooms = services[serviceIndex].totalNumber;
        let availability = services[serviceIndex].availability;

        if (action === "deleteBooking") {
                if (totalNumberOfRooms > availability) {
                    services[serviceIndex].availability += 1;
                } else {
                    return res.status(400).json({ error: "Нет доступных номеров" });
                }
        } else if (action === "addBooking") {
            if (availability > 0) {
                services[serviceIndex].availability -= 1;
            } else {
                return res.status(400).json({ error: "Нет доступных номеров" });
            }
        } else {
            return res.status(400).json({ error: "Некорректное действие (action). Используйте 'add' или 'delete'." });
        }

        services[serviceIndex].updatedAt = new Date().toISOString();
        await writeJsonFile("./data/services.json", services);

        return res.status(200).json({ message: "Доступность обновлена", service: services[serviceIndex] });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при обновлении доступности", details: error.message });
    }
});

router.put("/updatesaleservice/:id", async (req, res) => {
    //TODO: to link services.json and users.json to create new sales
    //to create a form with 3 cells for (startDate and endDate in week) and for how many weeks to keep it
    try {
        const services = await readJsonFile("./data/services.json");
        //UPD: i have sales inside users.json
        //if user.role === houseKeeper => (req.salesID&&req.startDate&&req.endDate&&req.salesSpan) => (property = services.find(id)) => create(property.salesID) => property.saledID.startDate=req.startDate&&property.saledID.endDate=req.endDate
    } catch (e) {
        res.status(500).json({ error: e, details: e.message });
    }
})

router.post("/ratingperservice/:id", async (req, res) => {
    try {
        const services = await readJsonFile("./data/services.json");
        //if user.role === registered_user => if(!(services[req.serviceID].ratings[user.id] = req.rating))else(rewriteExistingRating)
    } catch (e) {
        res.status(500).json({ error: e, details: e.message });
    }
})

router.put("/bookdate/:id", async (req, res) => {
    console.log(`2. I am inside router.post(/bookdate/:id`);
    try {
        const services = await readJsonFile("./data/services.json");

        const serviceID = req.params.id;
        console.log("serviceID:",serviceID);
        console.log("req.body.changeduser.selectedDate1.startDate:", req.body.changeduser.selectedDate1.startDate);
        console.log("req.body.changeduser.selectedDate1.endDate:", req.body.changeduser.selectedDate1.endDate);

        const { bookingStartBooking, bookingEndBooking, numberOfPeople } = req.body;

        //TODO: to use :id instead of bookingID

        const room = services.bookingID;

        room.dateAvailability.find( dateObject => {
            if ((dateObject.date === bookingStartBooking) ) {//{ "date": "2025-06-05", "for1": 4, "for2": 13, "for3": 15, "for4": 22, "for5": 17 }
                //TODO: now to find "for1", "for2", "for3", "for4", "for5"
                //TODO: to convert "numberOfPeople"==="1","2","3","4","5" to "for1", "for2", "for3", "for4", "for5"
                //dateObject.find(exactDate )
                /*dateObject.find( dateO => {
                    dateO
                })*/
                /*if ( dateObject. ) {
                    dateObject.numberOfPeople -= 1;
                }*/

            }
        })
        //TODO: in between to delete(i think i can create for() cycle here)
        room.dateAvailability.find( dateObject => {
            if ((dateObject.date === bookingEndBooking) ) {
                dateObject.numberOfPeople -= 1;
            }
        })

        //TODO: what should I return?

        //if user.role === registered_user => if(!(services[req.serviceID].ratings[user.id] = req.rating))else(rewriteExistingRating)
    } catch (e) {
        res.status(500).json({ error: e, details: e.message });
    }
})

let cachedDataMap = {};

//here i will sort according to params of useSearchParams([])
///services/sort/type /services/sort/cityId /services/sort/uniqueProperty /services/sort/housekeeper /services/sort/rating /services/sort/sales
router.put("/sort/:sortType", async (req, res) => {


    console.log("!!!!!!I am inside /services/sort/:sortType;")
    const type = req.params.sortType;//whats inside req.body, req.params?
    console.log("req.body.changeduser: ", req.body.changeduser)
    const sortType = req.body.changeduser;

    //cachedDataMap[type] => type=["sales", "type", "uniqueProperty", "country", "rating"].add("country" && city)
    if (cachedDataMap[type]) {
        return res.json(cachedDataMap[type]); // возвращаем кэш по конкретному типу
    }

    console.log("sortType:",type)
    try {
        const services = await readJsonFile("./data/services.json");


        /*const sortedRoomsUnique =  () => {//TODO: to add "async" here
            const unique = toMakeUnique(services);//functions filters rooms to make everything them unique
            console.log("unique:", unique)
            return unique;
        }//, [rooms]);*/
        const sortedRoomsUnique = toMakeUnique(services)
        //console.log("sortedRoomsUnique:", sortedRoomsUnique)

        let returnedFilteredArray = []
        returnedFilteredArray = SwitchCase({ sortedRoomsUnique, type })//this will return array which is filtered according to type
        //cachedData = returnedFilteredArray;//TODO: this doesnt work
        // сохраняем результат в кэш
        cachedDataMap[type] = returnedFilteredArray;
        res.json(returnedFilteredArray);
        //console.log("returnedFilteredArray:", returnedFilteredArray)
        console.log("returnedFilteredArray.length:", returnedFilteredArray.length)
        //console.log("cachedDataMap:", cachedDataMap)


    } catch (e) {
        res.status(500).json({ error: e, details: e.message });
    }

})

export default router;