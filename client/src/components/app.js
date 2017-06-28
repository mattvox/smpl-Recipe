import React from 'react';

import Header from './header';
// import ShowMoreButton from './show-more-btn';

// export default class App extends Component {
//   render() {
//     return (
//       <div>React simple starter
//         {this.props.children}
//       </div>
//     );
//   }
// }

const App = (props) => (
  <div>
    <div className='row'>
      <Header />
      {props.children}
    </div>
    {/* <div className='row'>
      <ShowMoreButton />
    </div> */}
  </div>
);

export default App;
