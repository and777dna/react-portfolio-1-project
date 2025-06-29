const Filter = () => {

    console.log("3.filterApply.includes(Hotels):",filterApply.includes("Hotels"));

    //const [filterApply, setFilterApply] = useState()
    function getClicked(filterWord: string) {
        console.log("getClicked clicked");
        console.log("1.filterApply.includes(Hotels):",filterApply.includes("Hotels"));
        console.log("1.filterApply:",filterApply);
        // setFilterApply(filterWord)//here i will give word for filter
        setFilterApply((prev) => {
            if(prev.includes(filterWord)) {
                return prev.filter((filterWordFind: string) => filterWordFind !== filterWord);
            } else {
                return [...prev, filterWord];
            }
        });
        // setFilterApply((prev) => [...prev, word]);
    }

    //here will be logic and UI component
    return <FilterCard>

        <Col span={8}>
            {/!*<Checkbox value="Hotels" onChange={() => getClicked("Hotels")} checked={false}>Hotels</Checkbox>*!/}
                <Checkbox value="Hotels" onChange={() => getClicked("Hotels")} checked={filterApply.includes("Hotels")}>Hotels</Checkbox>
    </Col>
    <Col span={8}>
        <Checkbox value="Apartments" onChange={() => getClicked("Apartments")} checked={filterApply.includes("Apartments")}>Apartments</Checkbox>
    </Col>
    <Col span={8}>
        <Checkbox value="Resorts" onChange={() => getClicked("Resorts")} checked={filterApply.includes("Resorts")}>Resorts</Checkbox>
    </Col>
    <Col span={8}>
        <Checkbox value="Villas" onChange={() => getClicked("Villas")} checked={filterApply.includes("Villas")}>Villas</Checkbox>
    </Col>
    <Col span={8}>
        <Checkbox value="Cabins" onChange={() => getClicked("Cabins")} checked={filterApply.includes("Cabins")}>Cabins</Checkbox>
    </Col>
    <Col span={8}>
        <Checkbox value="Cottages" onChange={() => getClicked("Cottages")} checked={filterApply.includes("Cottages")}>Cottages</Checkbox>
    </Col>

    <FilterButton/>

</FilterCard>
}

export default Filter