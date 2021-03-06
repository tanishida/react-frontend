import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import ContactsIcon from '@material-ui/icons/Contacts';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Drawer from '@material-ui/core/Drawer';
import InputText from './InputText';
import Calculator from './Calculator';
import Body from './Body';
import Gotanda from './Gotanda';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GotandaDetail from './GotandaDetail';
import HelpIcon from '@material-ui/icons/Help';
import Popover from '@material-ui/core/Popover';

class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      openStyle: {
        marginLeft: '240px'
      },
      closeStyle: {
        marginLeft: '-15px'
      },
      iconSize: {
        fontSize: '25px'
      },
      showDetail: false,
      showPop: false
    }
  }
  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }
  detailCloseAction() {
    this.props.actions.deleteGotandaRegistAction();
    if (this.props.navBarReducer.isOpenGotandaDetail) {
      this.props.actions.gotandaDetailToggleAction();
    }
  }
  handleClick () {
    this.setState({
      showPop: !this.state.showPop
    });
  };
  
  handleClose () {
    this.setState({
      showPop: !this.state.showPop
    });
  };
  

  render() {
    let inputText = this.props.navBarReducer.isOpenInputText ? <InputText {...this.props} /> : '';
    let calculator = this.props.navBarReducer.isOpenCalculator ? <Calculator {...this.props} /> : '';
    let body = this.props.navBarReducer.isOpenBody ? <Body {...this.props} /> : '';
    let gotanda = this.props.navBarReducer.isOpenGotanda ? <Gotanda {...this.props} /> : '';
    let gotandaDetail = this.props.navBarReducer.isOpenGotandaDetail ? 
      <GotandaDetail 
        handleName={this.props.gotandaRegistReducer.handleName}
        shopName={this.props.gotandaRegistReducer.shopName}
        date={this.props.gotandaRegistReducer.date}
        radioList={this.props.gotandaRegistReducer.radioList}
        comment={this.props.gotandaRegistReducer.comment}
        gotandaToggleAction={this.props.actions.gotandaToggleAction}
        deleteGotandaRegistAction={this.props.actions.deleteGotandaRegistAction}
        gotandaDetailToggleAction={this.props.actions.gotandaDetailToggleAction}

      /> : '';
      const id = this.state.showPop ? 'simple-popover' : undefined;

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Drawer
              open={this.state.open}
              anchor="left"
              onClose={() => this.handleToggle()}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                style={{marginLeft: '230px', marginRight: '10px'}}
                onClick={() => this.handleToggle()}
                edge="start">
              {this.state.open ? 
              <ChevronLeftIcon style={this.state.iconSize} /> : <ChevronRightIcon style={this.state.iconSize} />}
              </IconButton>
              <Divider />
              <ListItem 
                onClick={() => (this.props.actions.gotandaToggleAction(), this.detailCloseAction())} 
                disabled={this.props.navBarReducer.isOpenGotanda}>
                  <ListItemIcon><SearchIcon style={this.state.iconSize} /></ListItemIcon>
                  <div style={{fontSize: '15px'}}>
                    Gotanda information
                  </div>
              </ListItem>
              <ListItem 
                onClick={() => (this.props.actions.inputTextToggleAction(), this.detailCloseAction())} 
                disabled={this.props.navBarReducer.isOpenInputText}>
                  <ListItemIcon><RateReviewIcon style={this.state.iconSize} /></ListItemIcon>
                  <div style={{fontSize: '15px'}}>
                    Post message
                  </div>
              </ListItem>
              <ListItem 
                onClick={() => (this.props.actions.calculatorToggleAction(), this.detailCloseAction())} 
                disabled={this.props.navBarReducer.isOpenCalculator}>
                  <ListItemIcon><ContactsIcon style={this.state.iconSize} /></ListItemIcon>
                  <div style={{fontSize: '15px'}}>
                    Contact
                  </div>
              </ListItem>
            </Drawer>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton edge="start" onClick={() => this.handleToggle()} color="inherit" aria-label="menu">
                  <MenuIcon style={{fontSize: 'x-large'}} />
                </IconButton>
                <Typography style={{fontSize: 'x-large', fontWeight: 'bolder'}} variant="h6">
                  五反田ライク
                  <ThumbUpAltIcon style={{fontSize: 'x-large', marginBottom: '-2px'}} />
                </Typography>
                <div style={{marginLeft: 'auto'}}>
                  <IconButton aria-describedby={id} onClick={() => this.handleClick()}>
                    <HelpIcon style={{color: 'aliceblue'}} fontSize="large" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={this.state.showPop}
                    onClose={() => this.handleClick()}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 80, left: 200 }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography style={{marginTop: 5, marginBottom: 5, marginRight: 5, marginLeft: 5}}>
                      「五反田ライク<ThumbUpAltIcon style={{marginBottom: '-3px'}} />」とは、<br />
                      五反田好き（like）な皆様が主体となり、<br />
                      <br />
                      <div style={{fontWeight: 'bold'}}>
                        五反田の飲食店などのお店情報を<br />
                        誰でも自由に投稿、閲覧するアプリケーションです。<br />
                        お気軽にご利用ください。<br />
                      </div>
                      <br />
                      <div style={{fontSize: 'large', color: 'red'}}>
                      ※誹謗中傷はご遠慮下さい。
                      </div>
                    </Typography>
                  </Popover>
                </div>
              </Toolbar>
            </AppBar>

            <div style={{marginTop: 65}}>
              {gotandaDetail}
              {gotanda}
              {inputText}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NavBar;