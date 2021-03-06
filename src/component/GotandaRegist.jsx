import React from 'react';
import {TextField, RaisedButton, Snackbar} from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import api from '../api';

class GotandaRegist extends React.Component {
    constructor() {
      super()
      this.state = {
        activeRadio: '',
        snackberOpen: false
      }
    }
    onChangeRadio(e) {
      this.setState({activeRadio: e.target.value});
      this.props.radioAction(e.target.value);
    }
    onChangeText(e) {
      this.props.inputShopNameAction(e.target.value)
    }
    onChangeDate(date) {
      this.props.inputDateAction(date)
    }
    onChangePassword(e) {
      // password機能は後日実装
    }
    onAddText() {
      const formHandleName = this.props.handleName;
      const formShopName = this.props.shopName;
      const formDate = this.props.date;
      const formRadio = this.state.activeRadio;
      const formComment = this.props.comment;
      // password機能は後日実装
      const formPassword = 'test';
      if (formHandleName === '' || formShopName === '' || formRadio === '' || formComment === '' || formPassword === '') {
        return;
      }
      if (formComment !== '' && formComment !== undefined) {
        api.postGotandaRegistAction(formHandleName, formShopName, formDate, formRadio, formComment, formPassword);
        api.fetchGotandaRegistAction().then(items => {
          items.forEach(item => {
            this.props.inputSearchResultAction(item.handleName, item.shopName, item.date, item.radio, item.comment, item.id);
          });
        });
        this.setState({snackberOpen: true});
        this.props.deleteGotandaRegistAction();
      }
    }
    componentDidMount() {
      setInterval(() => {
        if (this.state.snackberOpen) {
          this.setState({snackberOpen: false});
        }
      }, 10000);
    }
    render() {
      const radio = this.props.radioList;
        return (
          <div className={this.props.activeKey !== '2' ? 'hidden' : ''} style={{marginTop: '10px'}}>
            <Grid container justify="center">
              <Snackbar message={'登録しました。'} open={this.state.snackberOpen} />
              <Grid container justify="left">
                <div style={{marginBottom: '-10px'}}>
                  登録日
                </div>
              </Grid>
              <Grid item xs={12}>
                <DatePicker 
                  hintText="日付を入力"
                  container="dialog"
                  value={this.props.date}
                  onChange={(e, date) => this.onChangeDate(date)}
                  disabled
                  mode="landscape" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="input"
                    value={this.props.handleName}
                    onChange={e => this.props.inputHandleNameAction(e.target.value)}
                    hintText="入力"
                    floatingLabelText="ハンドルネームを入力"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="input"
                  value={this.props.shopName}
                  onChange={e => this.onChangeText(e)}
                  hintText="入力"
                  floatingLabelText="お店の名前を入力"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl component="fieldset" style={{marginTop: '30px'}}>
                <FormLabel component="legend" style={{fontSize: '20px'}}>評価（おすすめ度）</FormLabel>
                  <RadioGroup aria-label="position" name="position" style={{width: 'max-content'}} row>
                    {
                      radio.map(item => {
                        return (
                          <FormControlLabel
                            value={item.index}
                            style={{marginLeft: item.index !== '1' ? '-20px' : ''}}
                            control={<Radio color="primary" />}
                            onChange={e => this.onChangeRadio(e)}
                            label={item.value}
                            labelPlacement="top"
                            checked={item.checked}
                          />
                        );
                      })
                    }
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  value={this.props.comment}
                  onChange={e => this.props.inputCommentAction(e.target.value)}
                  multiLine
                  fullWidth
                  hintText="入力"
                  floatingLabelText="口コミ、評価、コメント"
                  rows="4"
                />
              </Grid>
              <Grid item xs={12}>
              <div className={"hidden"}>
                <TextField
                    hintText="パスワードを入力"
                    floatingLabelText="パスワード（編集、削除時に使用）"
                    value={this.props.password}
                    onChange={e => this.onChangePassword(e)}
                    type="password"
                />
              </div>
              </Grid>
              <Grid item xs={12}>
                <RaisedButton secondary={true} label={'登録'} onClick={() => this.onAddText()} />
                <RaisedButton label={'クリア'}  onClick={() => this.props.deleteGotandaRegistAction()}/>
              </Grid>
            </Grid>
         </div>
      );
    }
  }
  
  export default GotandaRegist;