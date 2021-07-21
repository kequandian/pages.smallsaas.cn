import 'antd/dist/antd.css';
import framework from './framework';
import app from './app';

// import { addMenu } from './config/menu';
//
// addMenu(
//   {
//     name: 'dashboard2',
//     icon: 'dashboard',
//     path: 'dashboard2',
//   }
// );

class TestPageHeader extends React.PureComponent {
  render() {
    return (
      <div style={{padding: 20 }}>{this.props.children}</div>
    )
  }
}
const inject = {
  'PageHeader': TestPageHeader,
  // 'Copyright': 'xxx',
  // 'Company': 'FFSS',
  // 'Logo': 'none'
}
framework(inject);
app();
