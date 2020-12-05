import { Marker, Popup, TileLayer, Map, withLeaflet } from "react-leaflet";
import Search from "react-leaflet-search";
import React from 'react';

class SearchComponent extends React.Component {
  render() {
    return (
        <Search 
            {...this.props}
        />
    )
  } 
}

export default withLeaflet(SearchComponent);