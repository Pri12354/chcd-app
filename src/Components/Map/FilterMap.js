/////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { BsFilterLeft } from "react-icons/bs";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import locations from "../../Assets/indexes/location-index.json";
import translate from "../../Assets/indexes/translate.json";
import nationality from "../../Assets/indexes/nationality.json";
import religiousFamilyData from "../../Assets/indexes/religious_family.json";
import cat_trans from "../../Assets/indexes/categories.json";
import '../../Styles/Css/map.css';

/////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPONENT ////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


function FilterMap(props) {
  const { family_trans, relFamIndex } = religiousFamilyData;
  

  // SETUP DATA  //////////////////////////////////////////////////////////////////////////////////////

  //NODE OPTIONS CALLBACK
  const loadPAffIndex = (
    inputValuePAff: string,
    callback: (options: props.pAffIndex) => void
  ) => {
    setTimeout(() => {
      callback(props.fetchPAffIndex(inputValuePAff));
    }, 1000);
  };
  const loadAffIndex = (
    inputValueAff: string,
    callback: (options: props.affIndex) => void
  ) => {
    setTimeout(() => {
      callback(props.fetchAffIndex(inputValueAff));
    }, 1000);
  };

  const loadNatIndex = (
    inputValueNat: string,
    callback: (options: props.natIndex) => void
  ) => {
    setTimeout(() => {
      callback(props.fetchNatIndex(inputValueNat));
    }, 1000);
  };

  //PROPERTY SORTER
  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  // SORT LOCATION LIST USING PROERTY SORTER
  let locationAll = [
    { name_zh: "都", name_wes: "All", value: "都", type: "location" },
  ];
  let locationList = locationAll.concat(
    locations.sort(sortByProperty("name_wes"))
  );

  // PREPARE INST CATEGORIES AND SUBCATEGORIES
  let data = props.instCatsIndex;
  let subcat = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === props.institution_category) {
      let data2 = data[i][1];
      for (let t = 0; t < data2.length; t++) {
        let i = data2[t];
        subcat.push(
          <option value={i}>
            {
              cat_trans[0][
                i.replace(/\s+$/, "").replace(/\s|\//g, "_").toLowerCase()
              ][props.language]
            }
          </option>
        );
      }
    } else {
    }
  }
  // PREPARE EVENT CATEGORIES AND SUBCATEGORIES
  let dataEvents = props.eventsCatsIndex;
  let subcatEvents = [];
  for (let i = 0; i < dataEvents.length; i++) {
    if (dataEvents[i][0] === props.event_category) {
      let dataEvents2 = dataEvents[i][1];
      for (let t = 0; t < dataEvents2.length; t++) {
        let i = dataEvents2[t];
        subcatEvents.push(
          <option value={i}>
            {
              cat_trans[0][
                i.replace(/\s+$/, "").replace(/\s|\//g, "_").toLowerCase()
              ][props.language]
            }
          </option>
        );
      }
    } else {
    }
  }



  // PEOPLE FORM CONSTRUCTOR  ////////////////////////////////////////////////////////////////////////
  // PEOPLE FORM CONSTRUCTOR  ////////////////////////////////////////////////////////////////////////
  // PEOPLE FORM CONSTRUCTOR  ////////////////////////////////////////////////////////////////////////

  if (props.kind === "People") {
    return (
      <div className="filter_area">
        <div className={props.filterDisplay}>
          <div className="filter_header">
            {translate[0]["map-filters"][props.language]}
          </div>
          <div className="filter_scroll_area mb-4">
            <Form>
              {/* FORM SELEECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="type"
                    >
                      {translate[0]["type"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="type" place="right" effect="solid">
                      {translate[0]["select_type_map"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="kind"
                      aria-label={translate[0]["type"][props.language]}
                      value={props.kind}
                      onChange={(value) => props.handleFormChange(value)}
                    >
                      <option value="People">
                        {translate[0]["people"][props.language]}
                      </option>
                      <option value="Institutions">
                        {translate[0]["institutions"][props.language]}
                      </option>
                      <option value="Events">
                        {translate[0]["events"][props.language]}
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              {/* TIME SELECT ////////////////////////////////////////////////////////////////// */}
              <Row className="mb-1">
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="start_year"
                        >
                          {translate[0]["start_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="start_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="start_year"
                          aria-label={
                            translate[0]["start_year"][props.language]
                          }
                          value={props.start_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="end_year"
                        >
                          {translate[0]["end_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="end_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="end_year"
                          aria-label={translate[0]["end_year"][props.language]}
                          value={props.end_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* NAME SELECT ////////////////////////////////////////////////////////////////// */}
              <Row className="mb-1">
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="family_name"
                        >
                          {translate[0]["family_name"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="family_name"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_name"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="family_name_western"
                          aria-label={
                            translate[0]["family_name"][props.language]
                          }
                          value={props.family_name_western}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="given_name"
                        >
                          {translate[0]["given_name"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="given_name"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_name"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="given_name_western"
                          aria-label={
                            translate[0]["given_name"][props.language]
                          }
                          value={props.given_name_western}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* PERS AFF SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="affiliation"
                    >
                      {translate[0]["affiliation"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="affiliation" place="right" effect="solid">
                      {translate[0]["type_to_select"][props.language]}
                    </ReactTooltip>
                    <AsyncSelect
                      loadOptions={loadPAffIndex}
                      placeholder={translate[0]["type_to"][props.language]}
                      onInputChange={props.handleMapInputChange}
                      getOptionLabel={(option) => option[props.language]}
                      defaultInputValue={props.inputValuePAff}
                      onChange={(option) => props.handleChangeData(option)}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* NATIONALITY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="nationality"
                    >
                      {translate[0]["nationality"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="nationality" place="right" effect="solid">
                      {translate[0]["type_to_select_country"][props.language]}
                    </ReactTooltip>
                    <AsyncSelect
                      loadOptions={loadNatIndex}
                      placeholder={translate[0]["type_to"][props.language]}
                      onInputChange={props.handleMapNatInputChange}
                      getOptionLabel={(option) =>
                        nationality[0][
                          option.value.replace(/\s|\//g, "_").toLowerCase()
                        ][props.language]
                      }
                      defaultInputValue={props.inputValueNat}
                      onChange={(option) => props.handleChangeData(option)}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* PLACE SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="location"
                    >
                      {translate[0]["location"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="location" place="right" effect="solid">
                      {translate[0]["type_to_select_location"][props.language]}
                    </ReactTooltip>
                    <Select
                      name="location"
                      aria-label={translate[0]["location"][props.language]}
                      placeholder={translate[0]["all"][props.language]}
                      options={locationList}
                      getOptionLabel={(option) => {
                        if (
                          props.language === "zh" ||
                          props.language === "tw"
                        ) {
                          return option.name_zh;
                        } else {
                          return `${option.name_wes} (${option.name_zh})`; // fix to display Chinese name next to English
                        }
                      }}
                      onChange={(e) => props.handleChangeData(e)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* GENDER SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="gender"
                    >
                      {translate[0]["gender"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="gender" place="right" effect="solid">
                      {translate[0]["select_start"][props.language]}{" "}
                      {translate[0]["gender"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="gender"
                      aria-label={translate[0]["gender"][props.language]}
                      value={props.gender}
                      onChange={(value) => props.handleChange(value)}
                    >
                      <option value="All">
                        {translate[0]["all"][props.language]}
                      </option>
                      <option value="Female">
                        {translate[0]["female"][props.language]}
                      </option>
                      <option value="Male">
                        {translate[0]["male"][props.language]}
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form> 
          </div>
          
          {/* BUTTONS SELECT ////////////////////////////////////////////////////////////////// */}
          <div className="filter-buttons"> 
            <Row className="mb-1">
              <Col>
                <Button
                  className="mb-1 col-12"
                  variant="danger"
                  onClick={() => props.fetchResults()}
                >
                  {translate[0]["submit"][props.language]}
                </Button>
              </Col>
              <Col>
                <Button
                  className="mb-1 col-12"
                  variant="outline-danger"
                  onClick={() => props.resetFilter()}
                >
                  {translate[0]["clear-all"][props.language]}
                </Button>
              </Col>
            </Row>
          </div>

          {/* FILTER TOGGLE SELECT ////////////////////////////////////////////////////////////////// */}
          <div className="filter_button_container">
            <div
              onClick={() => props.filterHide()}
              className="filter_button"
              data-tip
              data-for="toggle"
            >
              <ReactTooltip id="toggle" place="right" effect="solid">
                {translate[0]["toggle_filters"][props.language]}
              </ReactTooltip>
              <BsFilterLeft />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // INSTITUTION FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  // INSTITUTION FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  // INSTITUTION FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  else if (props.kind === "Institutions") {
    let defaultInput;
    if (props.inputValueAff !== "") {
      defaultInput = props.inputValueAff;
    } else {
      defaultInput = translate[0]["type_to"][props.language];
    }


    return (
      <div className="filter_area">
        <div className={props.filterDisplay}>
          <div className="filter_header">
            {translate[0]["map-filters"][props.language]}
          </div>
          <div className="filter_scroll_area mb-4">
            <Form>
              {/* FORM SELEECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="type"
                    >
                      {translate[0]["type"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="type" place="right" effect="solid">
                      {translate[0]["select_type_map"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="kind"
                      aria-label={translate[0]["type"][props.language]}
                      value={props.kind}
                      onChange={(value) => props.handleFormChange(value)}
                    >
                      <option value="People">
                        {translate[0]["people"][props.language]}
                      </option>
                      <option value="Institutions">
                        {translate[0]["institutions"][props.language]}
                      </option>
                      <option value="Events">
                        {translate[0]["events"][props.language]}
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              {/* TIME SELECT ////////////////////////////////////////////////////////////////// */}
              <Row className="mb-1">
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="start_year"
                        >
                          {translate[0]["start_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="start_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="start_year"
                          aria-label={
                            translate[0]["start_year"][props.language]
                          }
                          value={props.start_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="end_year"
                        >
                          {translate[0]["end_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="end_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="end_year"
                          aria-label={translate[0]["end_year"][props.language]}
                          value={props.end_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* NAME SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="inst_name"
                    >
                      {translate[0]["inst_name"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="inst_name" place="right" effect="solid">
                      {translate[0]["enter_name"][props.language]}
                    </ReactTooltip>
                    <Form.Control
                      type="text"
                      name="name_western"
                      aria-label={translate[0]["inst_name"][props.language]}
                      value={props.name_western}
                      onChange={(value) => props.handleChange(value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* INST AFF SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="inst_affiliation"
                    >
                      {translate[0]["inst_affiliation"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="inst_affiliation"
                      place="right"
                      effect="solid"
                    >
                      {translate[0]["type_to_select"][props.language]}
                    </ReactTooltip>
                    <AsyncSelect
                      loadOptions={loadAffIndex}
                      onInputChange={props.handleMapAffInputChange}
                      placeholder={defaultInput}
                      defaultInputValue={props.inputValueAff}
                      getOptionLabel={(option) => option[props.language]}
                      onChange={(option) => props.handleChangeData(option)}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* RELIGIOUS FAMILY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="religious_family"
                    >
                      {translate[0]["religious_family"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="religious_family"
                      place="right"
                      effect="solid"
                    >
                      {
                        translate[0]["type_to_select_religious_family"][
                          props.language
                        ]
                      }
                    </ReactTooltip>
                    
                    <Select
                      name="religious_family"
                      aria-label={
                        translate[0]["religious_family"][props.language]
                      }
                      placeholder={translate[0]["all"][props.language]}
                      options={relFamIndex}
                      getOptionLabel={(option) => {
                        const lang = props.language; 
                        const english = option.label.en; 
                        const chinese = option.label.zh; 
                        return chinese && chinese !== english 
                          ? `${english} (${chinese})` 
                          : english; 
                      }}
                      onChange={(e) => props.handleChangeData(e)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* PLACE SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="location"
                    >
                      {translate[0]["location"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="location" place="right" effect="solid">
                      {translate[0]["type_to_select_location"][props.language]}
                    </ReactTooltip>
                    <Select
                      name="location"
                      aria-label={translate[0]["location"][props.language]}
                      placeholder={translate[0]["all"][props.language]}
                      options={locationList}
                      getOptionLabel={(option) => {
                        if (
                          props.language === "zh" ||
                          props.language === "tw"
                        ) {
                          return option.name_zh;
                        } else {
                          return `${option.name_wes} (${option.name_zh})`;
                        }
                      }}
                      onChange={(e) => props.handleChangeData(e)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* CATEGORY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="inst_category"
                    >
                      {translate[0]["inst_category"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="inst_category"
                      place="right"
                      effect="solid"
                    >
                      {translate[0]["select_start"][props.language]}{" "}
                      {translate[0]["category"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="institution_category"
                      aria-label={translate[0]["inst_category"][props.language]}
                      value={props.institution_category}
                      onChange={(i) => props.handleChange(i)}
                    >
                      {props.instCatsIndex.map((node, i) => {
                        let val = node[0];
                        return (
                          <option data-index={i} value={val}>
                            {
                              cat_trans[0][
                                val
                                  .replace(/\s+$/, "")
                                  .replace(/\s|\//g, "_")
                                  .toLowerCase()
                              ][props.language]
                            }
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              {/* SUBCATEGORY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="inst_subcategory"
                    >
                      {translate[0]["inst_subcategory"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="inst_subcategory"
                      place="right"
                      effect="solid"
                    >
                      {translate[0]["select_start"][props.language]}{" "}
                      {translate[0]["subcategory"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="institution_subcategory"
                      aria-label={
                        translate[0]["inst_subcategory"][props.language]
                      }
                      value={props.institution_subcategory}
                      onChange={(value) => props.handleChange(value)}
                    >
                      {subcat}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>

          {/* BUTTONS SELECT ////////////////////////////////////////////////////////////////// */}
          <div className="filter-buttons">
            <Row className="mb-1">
              <Col>
                <Button
                  className="mb-1 col-12"
                  variant="danger"
                  onClick={() => props.fetchResults()}
                >
                  {translate[0]["submit"][props.language]}
                </Button>
              </Col>
              <Col>
                <Button
                  className="mb-1 col-12"
                  variant="outline-danger"
                  onClick={() => props.resetFilter()}
                >
                  {translate[0]["clear-all"][props.language]}
                </Button>
              </Col>
            </Row>
          </div>

          {/* FILTER TOGGLE SELECT ////////////////////////////////////////////////////////////////// */}
          <div className="filter_button_container">
            <div
              onClick={() => props.filterHide()}
              className="filter_button"
              data-tip
              data-for="toggle"
            >
              <ReactTooltip id="toggle" place="right" effect="solid">
                {translate[0]["toggle_filters"][props.language]}
              </ReactTooltip>
              <BsFilterLeft />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EVENT FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  // EVENT FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  // EVENT FORM CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////
  else if (props.kind === "Events") {
    return (
      <div className="filter_area">
        <div className={props.filterDisplay}>
          <div className="filter_header">
            {translate[0]["map-filters"][props.language]}
          </div>
          <div className="filter_scroll_area mb-4">
            <Form>
              {/* FORM SELEECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="type"
                    >
                      {translate[0]["type"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="type" place="right" effect="solid">
                      {translate[0]["select_type_map"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="kind"
                      aria-label={translate[0]["type"][props.language]}
                      value={props.kind}
                      onChange={(value) => props.handleFormChange(value)}
                    >
                      <option value="People">
                        {translate[0]["people"][props.language]}
                      </option>
                      <option value="Institutions">
                        {translate[0]["institutions"][props.language]}
                      </option>
                      <option value="Events">
                        {translate[0]["events"][props.language]}
                      </option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              {/* TIME SELECT ////////////////////////////////////////////////////////////////// */}
              <Row className="mb-1">
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="start_year"
                        >
                          {translate[0]["start_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="start_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="start_year"
                          aria-label={
                            translate[0]["start_year"][props.language]
                          }
                          value={props.start_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label
                          className="filter_label mb-0"
                          data-tip
                          data-for="end_year"
                        >
                          {translate[0]["end_year"][props.language]}
                        </Form.Label>
                        <ReactTooltip
                          id="end_year"
                          place="right"
                          effect="solid"
                        >
                          {translate[0]["enter_year"][props.language]}
                        </ReactTooltip>
                        <Form.Control
                          type="text"
                          name="end_year"
                          aria-label={translate[0]["end_year"][props.language]}
                          value={props.end_year}
                          onChange={(value) => props.handleChange(value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* NAME SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="inst_name"
                    >
                      {translate[0]["event_name"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="event_name" place="right" effect="solid">
                      {translate[0]["enter_name"][props.language]}
                    </ReactTooltip>
                    <Form.Control
                      type="text"
                      name="name_western"
                      aria-label={translate[0]["event_name"][props.language]}
                      value={props.name_western}
                      onChange={(value) => props.handleChange(value)}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* PLACE SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="location"
                    >
                      {translate[0]["location"][props.language]}
                    </Form.Label>
                    <ReactTooltip id="location" place="right" effect="solid">
                      {translate[0]["type_to_select_location"][props.language]}
                    </ReactTooltip>
                    <Select
                      name="location"
                      aria-label={translate[0]["location"][props.language]}
                      placeholder={translate[0]["all"][props.language]}
                      options={locationList}
                      getOptionLabel={(option) => {
                        if (
                          props.language === "zh" ||
                          props.language === "tw"
                        ) {
                          return option.name_zh;
                        } else {
                          return `${option.name_wes} (${option.name_zh})`;
                        }
                      }}
                      onChange={(e) => props.handleChangeData(e)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* CATEGORY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="event_category"
                    >
                      {translate[0]["event_category"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="event_category"
                      place="right"
                      effect="solid"
                    >
                      {translate[0]["select_start"][props.language]}{" "}
                      {translate[0]["category"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="event_category"
                      aria-label={
                        translate[0]["event_category"][props.language]
                      }
                      value={props.event_category}
                      onChange={(i) => props.handleChange(i)}
                    >
                      {props.eventsCatsIndex.map((node, i) => {
                        let val = node[0];
                        return (
                          <option data-index={i} value={val}>
                            {
                              cat_trans[0][
                                val
                                  .replace(/\s+$/, "")
                                  .replace(/\s|\//g, "_")
                                  .toLowerCase()
                              ][props.language]
                            }
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              {/* SUBCATEGORY SELECT ////////////////////////////////////////////////////////////////// */}
              <Form.Group className="mb-1">
                <Row>
                  <Col>
                    <Form.Label
                      className="filter_label mb-0"
                      data-tip
                      data-for="event_subcategory"
                    >
                      {translate[0]["event_subcategory"][props.language]}
                    </Form.Label>
                    <ReactTooltip
                      id="event_subcategory"
                      place="right"
                      effect="solid"
                    >
                      {translate[0]["select_start"][props.language]}{" "}
                      {translate[0]["subcategory"][props.language]}
                    </ReactTooltip>
                    <Form.Select
                      name="event_subcategory"
                      aria-label={
                        translate[0]["event_subcategory"][props.language]
                      }
                      value={props.event_subcategory}
                      onChange={(value) => props.handleChange(value)}
                    >
                      {subcatEvents}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </div>

          {/* BUTTONS SELECT ////////////////////////////////////////////////////////////////// */}
          <Row className="mb-1">
            <Col>
              <Button
                className="mb-1 col-12"
                variant="danger"
                onClick={() => props.fetchResults()}
              >
                {translate[0]["submit"][props.language]}
              </Button>
            </Col>
            <Col>
              <Button
                className="mb-1 col-12"
                variant="outline-danger"
                onClick={() => props.resetFilter()}
              >
                {translate[0]["clear-all"][props.language]}
              </Button>
            </Col>
          </Row>

          {/* FILTER TOGGLE SELECT ////////////////////////////////////////////////////////////////// */}
          <div className="filter_button_container">
            <div
              onClick={() => props.filterHide()}
              className="filter_button"
              data-tip
              data-for="toggle"
            >
              <ReactTooltip id="toggle" place="right" effect="solid">
                {translate[0]["toggle_filters"][props.language]}
              </ReactTooltip>
              <BsFilterLeft />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPORT //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

export default FilterMap;
