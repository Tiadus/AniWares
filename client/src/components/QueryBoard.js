import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DisplayBoard from "./DisplayBoard";

const QueryBoard = (props) => {
    const filterChangeHandler = (event) => {
        props.filterChangeHandler(event);
    }

    const createFilterSection = (queryAttribute, filterColumn, filterName) => {
        let filterValues = props.sessionData[queryAttribute];

        if (filterValues.length === 0 || filterValues === null || filterValues === undefined) {
            return;
        }

        let filterSection = filterValues.map(item => {
            return (
                <div style={{width: "100%"}} key={item[filterColumn] + props.sessionData.search + props.searchClick}>
                    <input type="checkbox" name={filterColumn} value={item[filterColumn]} onChange={filterChangeHandler}/> {' '}
                    <span>{item[filterColumn]}</span> {' '}
                    <span>({item.total})</span>
                </div>
            )
        })
        return(
            <div style={{width: "100%", borderBottom: "1px solid grey", marginBottom: "10%"}} key={filterName}>
                <h2>{filterName}</h2>
                {filterSection}
            </div>
        );
    }

    const createFilterTable = () => {
        let filterTable = [];

        let brandFilter = createFilterSection("itemBrand", "itemBrand", "Brand");
        filterTable.push(brandFilter);

        let categoryFilter = createFilterSection("itemCategory", "itemCategory", "Category");
        filterTable.push(categoryFilter);

        let typeFilter = createFilterSection("itemType", "itemType", "Type");
        filterTable.push(typeFilter);

        let scaleFilter = createFilterSection("itemScale", "itemScale", "Scale");
        filterTable.push(scaleFilter);

        let seriesFilter = createFilterSection("itemSeries", "itemSeries", "Series");
        filterTable.push(seriesFilter);

        return filterTable;
    }

    return(
        <Row className="gy-4">
            <Col xxl={2} xl={2} lg={2} md={12} sm={12}>
                {createFilterTable()}
            </Col>
            <Col>
                <DisplayBoard items={props.sessionData.items} withFilter={true}/>
            </Col>
        </Row>
    )
}

export default QueryBoard;