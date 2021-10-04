// IMPORTS ////////////////////////////////////////////////////////////////////

// MAIN DEPENDENCIES
import React, { Component } from 'react'
import neo4j from "neo4j-driver/lib/browser/neo4j-web";
// CHILD COMPONENTS
import FilterSearch from "../Filters/FilterSearch.js";
import SearchResults from "../DataDisplays/SearchResults.js"
import Popup from "../DataDisplays/Popup.js";
import NoResults from "../DataDisplays/NoResults.js";
// HELPER FILES
import credentials from "../../credentials.json";
import * as helper from "../Utils/Helpers.js";
import * as query from "../Utils/Queries.js";


class SearchView extends Component {

//STATE, PROPS, DRIVER INFO, & BINDS //////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      //FILTER INPUTS
      search: "",
      start_year: "",
      end_year: "",
      // DATA ARRAYS & SELECT NODE
      nodeArray: [],
      selectArray: [],
      breadCrumb: [],
      nodeSelect: "",
      // AVAILABLE FILTERS
      labelList: [],
      genderList: [],
      nationalityList: [],
      filterArray: [],
      relFamList: [],
      christTradList: [],
      instCatList: [],
      instSubCatList: [],
      corpCatList: [],
      corpSubCatList: [],
      eventCatList: [],
      eventSubCatList: [],
      affList: [],
      instList: [],
      provList: [],
      prefList: [],
      countyList: [],
      //FILTER VALUES
      label: "",
      nationality: "",
      gender: "",
      religious_family: "",
      christian_tradition: "",
      institution_category: "",
      institution_subcategory: "",
      corporate_entity_category: "",
      corporate_entity_subcategory: "",
      event_category: "",
      event_subcategory: "",
      name_western: "",
      inst_name_western: "",
      province: "",
      prefecture: "",
      county: "",
      // DISPLAY CONTROLS
      popupcontainer: "popupcontainer hide",
      filterDisplay: "filter_container",
      addinfo: "addinfo hide",
      noresults: "noresults hide",
      // FORM SELECTS
      instCatsIndex: [],
      relFamIndex: [],
      affIndex: [],
      pAffIndex: [],
      natIndex: [],
      // LOAD STATES
      content: "loaded"
    };
    // INITIATE NEO4J INSTANCE
    this.driver = neo4j.driver(
      credentials.port,
      neo4j.auth.basic(credentials.username, credentials.password),
      { disableLosslessIntegers: true }
    );
    // BIND UTILITY FUNCTIONS TO THIS CONTEXT
    this.fetchResults = query.fetchResults.bind(this);
    this.fetchSearch = query.fetchSearch.bind(this);
    this.selectSwitchInitial = query.selectSwitchInitial.bind(this);
    this.selectSwitchAppend = query.selectSwitchAppend.bind(this);
    this.selectSwitchReduce = query.selectSwitchReduce.bind(this);
    this.breadCrumbChainer = helper.breadCrumbChainer.bind(this);
    this.breadCrumbReducer = helper.breadCrumbReducer.bind(this);
    this.handleChange = helper.handleChange.bind(this);
    this.handleFilterCheck = helper.handleFilterCheck.bind(this);
    this.filterHide = helper.filterHide.bind(this);
    this.resetFilter = helper.resetFilter.bind(this);
    this.handleFormChange = helper.handleFormChange.bind(this);
    this.fetchMapIndexes = query.fetchMapIndexes.bind(this);
    this.toggleDisplay = helper.toggleDisplay.bind(this);
    this.handleKeyPress = helper.handleKeyPress.bind(this);
    this.filterResults = helper.filterResults.bind(this);
    this.clearFilters = helper.clearFilters.bind(this);
  };

//RUN ON COMPONENT MOUNT //////////////////////////////////////////////////////
  componentDidMount() {

  };

//RENDER //////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
        <NoResults
          noresults={this.state.noresults}
          toggleDisplay = {this.toggleDisplay}
        />
        <FilterSearch
          {...this.state}
          selectSwitchInitial={this.clickHandler}
          handleChange={this.handleChange}
          resetFilter={this.resetFilter}
          fetchResults={this.fetchResults}
          filterHide={this.filterHide}
          handleFormChange={this.handleFormChange}
          handleFilterCheck={this.handleFilterCheck}
          filterResults={this.filterResults}
          clearFilters={this.clearFilters}
        />
        <SearchResults
          {...this.state}
          handleKeyPress={this.handleKeyPress}
          fetchSearch={this.fetchSearch}
          handleChange={this.handleChange}
          breadCrumbChainer={this.breadCrumbChainer}
          selectSwitchInitial={this.selectSwitchInitial}
        />
        <Popup
          {...this.state}
          toggleDisplay = {this.toggleDisplay}
          breadCrumbChainer={this.breadCrumbChainer}
          breadCrumbReducer={this.breadCrumbReducer}
          selectSwitchAppend={this.selectSwitchAppend}
          selectSwitchReduce={this.selectSwitchReduce}
          selectSwitchInitial={this.selectSwitchInitial}
        />
      </div>
    )
  }

}

export default SearchView
