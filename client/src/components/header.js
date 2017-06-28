import React from 'react';
import Headroom from 'react-headroom';

import SearchBar from './search-bar';

const Header = () => (
  <Headroom>
    <SearchBar />
  </Headroom>
);

export default Header;
