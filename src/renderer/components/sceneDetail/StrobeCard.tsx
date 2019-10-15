import * as React from "react";
import clsx from "clsx";

import {
  Collapse, createStyles, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel,
  MenuItem, Select, Slider, Switch, TextField, Theme, Typography, withStyles
} from "@material-ui/core";

import {SL, TF} from "../../data/const";
import {SceneSettings} from "../../data/Config";
import Scene from "../../data/Scene";
import en from "../../data/en";
import ColorPicker from "../ui/ColorPicker";

const styles = (theme: Theme) => createStyles({
  fullWidth: {
    width: '100%',
  },
  paddingLeft: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  noPadding: {
    padding: '0 !important',
  },
  endInput: {
    paddingLeft: theme.spacing(1),
    paddingTop: 0,
  },
  percentInput: {
    minWidth: theme.spacing(11),
  },
});

class StrobeCard extends React.Component {
  readonly props: {
    classes: any,
    scene: Scene | SceneSettings,
    sidebar: boolean,
    onUpdateScene(scene: Scene | SceneSettings, fn: (scene: Scene | SceneSettings) => void): void,
  };

  render() {
    const classes = this.props.classes;

    const strobeOpacity = typeof this.props.scene.strobeOpacity === 'number' ? this.props.scene.strobeOpacity : 0;
    const strobeSinRate = typeof this.props.scene.strobeSinRate === 'number' ? this.props.scene.strobeSinRate : 0;
    const strobeBPMMulti = typeof this.props.scene.strobeBPMMulti === 'number' ? this.props.scene.strobeBPMMulti : 0;
    const strobeTime = typeof this.props.scene.strobeTime === 'number' ? this.props.scene.strobeTime : 0;
    const strobeTimeMin = typeof this.props.scene.strobeTimeMin === 'number' ? this.props.scene.strobeTimeMin : 0;
    const strobeTimeMax = typeof this.props.scene.strobeTimeMax === 'number' ? this.props.scene.strobeTimeMax : 0;
    const strobeDelaySinRate = typeof this.props.scene.strobeDelaySinRate === 'number' ? this.props.scene.strobeDelaySinRate : 0;
    const strobeDelayBPMMulti = typeof this.props.scene.strobeDelayBPMMulti === 'number' ? this.props.scene.strobeDelayBPMMulti : 0;
    const strobeDelay = typeof this.props.scene.strobeDelay === 'number' ? this.props.scene.strobeDelay : 0;
    const strobeDelayMin = typeof this.props.scene.strobeDelayMin === 'number' ? this.props.scene.strobeDelayMin : 0;
    const strobeDelayMax = typeof this.props.scene.strobeDelayMax === 'number' ? this.props.scene.strobeDelayMax : 0;
    return(
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={this.props.sidebar ? 12 : 5}>
              <FormControlLabel
                control={
                  <Switch checked={this.props.scene.strobe}
                          onChange={this.onBoolInput.bind(this, 'strobe')}/>
                }
                label="Strobe"/>
            </Grid>
            <Grid item xs={12} sm={this.props.sidebar ? 12 : 7}>
              <Collapse in={this.props.scene.strobe} className={clsx(classes.fullWidth, classes.paddingLeft)}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.props.scene.strobePulse}
                      onChange={this.onBoolInput.bind(this, 'strobePulse')}/>
                  }
                  label="Add Delay"/>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={clsx((!this.props.scene.strobe || this.props.scene.strobeLayer == SL.image) && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe && this.props.scene.strobeLayer != SL.image} className={classes.fullWidth}>
            <ColorPicker
              currentColor={this.props.scene.strobeColor}
              onChangeColor={this.onInput.bind(this, 'strobeColor')}/>
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx(!this.props.scene.strobe && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe} className={classes.fullWidth}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={!this.props.sidebar && this.props.scene.strobeLayer == SL.bottom ? 4 : 12} className={classes.paddingTop}>
                <FormControl className={classes.fullWidth}>
                  <InputLabel>Strobe Layer</InputLabel>
                  <Select
                    value={this.props.scene.strobeLayer}
                    onChange={this.onInput.bind(this, 'strobeLayer')}>
                    {Object.values(SL).map((sl) =>
                      <MenuItem key={sl} value={sl}>{en.get(sl)}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 'auto'} className={clsx(this.props.scene.strobeLayer != SL.bottom && classes.noPadding)}>
                <Collapse in={this.props.scene.strobeLayer == SL.bottom} className={classes.fullWidth}>
                  <Typography id="strobe-opacity-slider" variant="caption" component="div" color="textSecondary">
                    Strobe Opacity
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        min={0}
                        value={strobeOpacity * 100}
                        onChange={this.onPercentSliderChange.bind(this, 'strobeOpacity')}
                        aria-labelledby="strobe-opacity-slider"/>
                    </Grid>
                    <Grid item xs={3} className={classes.percentInput}>
                      <TextField
                        value={Math.round(strobeOpacity * 100)}
                        margin="dense"
                        onChange={this.onPercentIntInput.bind(this, 'strobeOpacity')}
                        onBlur={this.blurPercentIntKey.bind(this, 'strobeOpacity')}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        inputProps={{
                          className: classes.endInput,
                          step: 5,
                          min: 0,
                          max: 100,
                          type: 'number',
                          'aria-labelledby': 'strobe-opacity-slider',
                        }}/>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx(!this.props.scene.strobe && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe} className={classes.fullWidth}>
            <Divider />
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx(!this.props.scene.strobe && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe} className={classes.fullWidth}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 4} style={{paddingTop: 10}}>
                <FormControl className={classes.fullWidth}>
                  <InputLabel>Timing</InputLabel>
                  <Select
                    value={this.props.scene.strobeTF}
                    onChange={this.onInput.bind(this, 'strobeTF')}>
                    {Object.values(TF).map((tf) =>
                      <MenuItem key={tf} value={tf}>{en.get(tf)}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 8}>
                <Collapse in={this.props.scene.strobeTF == TF.sin} className={classes.fullWidth}>
                  <Typography id="strobe-sin-rate-slider" variant="caption" component="div" color="textSecondary">
                    Wave Rate
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Slider
                        min={1}
                        value={strobeSinRate}
                        onChange={this.onSliderChange.bind(this, 'strobeSinRate')}
                        aria-labelledby="strobe-sin-rate-slider"/>
                    </Grid>
                    <Grid item xs={3} className={classes.percentInput}>
                      <TextField
                        value={strobeSinRate}
                        onChange={this.onIntInput.bind(this, 'strobeSinRate')}
                        onBlur={this.blurIntKey.bind(this, 'strobeSinRate')}
                        inputProps={{
                          className: classes.endInput,
                          step: 5,
                          min: 0,
                          max: 100,
                          type: 'number',
                          'aria-labelledby': 'strobe-sin-rate-slider',
                        }}/>
                    </Grid>
                  </Grid>
                </Collapse>
                <Collapse in={this.props.scene.strobeTF == TF.bpm} className={classes.fullWidth}>
                  <Typography id="strobe-bpm-multi-slider" variant="caption" component="div" color="textSecondary">
                    BPM Multiplier {this.props.scene.strobeBPMMulti > 0 ? this.props.scene.strobeBPMMulti : "1 / " + (-1 * (this.props.scene.strobeBPMMulti - 2))}x
                  </Typography>
                  <Slider
                    min={-8}
                    max={10}
                    value={strobeBPMMulti}
                    onChange={this.onSliderChange.bind(this, 'strobeBPMMulti')}
                    aria-labelledby="strobe-bpm-multi-slider"/>
                </Collapse>
                <Collapse in={this.props.scene.strobeTF == TF.constant} className={classes.fullWidth}>
                  <TextField
                    variant="outlined"
                    label="For"
                    margin="dense"
                    value={strobeTime}
                    onChange={this.onIntInput.bind(this, 'strobeTime')}
                    onBlur={this.blurIntKey.bind(this, 'strobeTime')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                    inputProps={{
                      step: 100,
                      min: 0,
                      type: 'number',
                    }}/>
                </Collapse>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx(!this.props.scene.strobe && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe && (this.props.scene.strobeTF == TF.random || this.props.scene.strobeTF == TF.sin)} className={classes.fullWidth}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 6}>
                <TextField
                  variant="outlined"
                  label="Between"
                  margin="dense"
                  value={strobeTimeMin}
                  onChange={this.onIntInput.bind(this, 'strobeTimeMin')}
                  onBlur={this.blurIntKey.bind(this, 'strobeTimeMin')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                  }}
                  inputProps={{
                    step: 100,
                    min: 0,
                    type: 'number',
                  }}/>
              </Grid>
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 6}>
                <TextField
                  variant="outlined"
                  label="and"
                  margin="dense"
                  value={strobeTimeMax}
                  onChange={this.onIntInput.bind(this, 'strobeTimeMax')}
                  onBlur={this.blurIntKey.bind(this, 'strobeTimeMax')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                  }}
                  inputProps={{
                    step: 100,
                    min: 0,
                    type: 'number',
                  }}/>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx((!this.props.scene.strobe || !this.props.scene.strobePulse)  && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe && this.props.scene.strobePulse} className={classes.fullWidth}>
            <Divider />
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx((!this.props.scene.strobe || !this.props.scene.strobePulse) && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe && this.props.scene.strobePulse} className={classes.fullWidth}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 4} style={{paddingTop: 10}}>
                <FormControl className={classes.fullWidth}>
                  <InputLabel>Delay Timing</InputLabel>
                  <Select
                    value={this.props.scene.strobeDelayTF}
                    onChange={this.onInput.bind(this, 'strobeDelayTF')}>
                    {Object.values(TF).map((tf) =>
                      <MenuItem key={tf} value={tf}>{en.get(tf)}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 8}>
                <Collapse in={this.props.scene.strobeDelayTF == TF.sin} className={classes.fullWidth}>
                  <Typography id="strobe-delay-sin-rate-slider" variant="caption" component="div" color="textSecondary">
                    Wave Rate
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Slider
                        min={1}
                        value={strobeDelaySinRate}
                        onChange={this.onSliderChange.bind(this, 'strobeDelaySinRate')}
                        aria-labelledby="strobe-delay-sin-rate-slider"/>
                    </Grid>
                    <Grid item xs={3} className={classes.percentInput}>
                      <TextField
                        value={strobeDelaySinRate}
                        onChange={this.onIntInput.bind(this, 'strobeDelaySinRate')}
                        onBlur={this.blurIntKey.bind(this, 'strobeDelaySinRate')}
                        inputProps={{
                          className: classes.endInput,
                          step: 5,
                          min: 0,
                          max: 100,
                          type: 'number',
                          'aria-labelledby': 'strobe-delay-sin-rate-slider',
                        }}/>
                    </Grid>
                  </Grid>
                </Collapse>
                <Collapse in={this.props.scene.strobeDelayTF == TF.bpm} className={classes.fullWidth}>
                  <Typography id="strobe-delay-bpm-multi-slider" variant="caption" component="div" color="textSecondary">
                    BPM Multiplier {this.props.scene.strobeDelayBPMMulti > 0 ? this.props.scene.strobeDelayBPMMulti : "1 / " + (-1 * (this.props.scene.strobeDelayBPMMulti - 2))}x
                  </Typography>
                  <Slider
                    min={-8}
                    max={10}
                    value={strobeDelayBPMMulti}
                    onChange={this.onSliderChange.bind(this, 'strobeDelayBPMMulti')}
                    aria-labelledby="strobe-delay-bpm-multi-slider"/>
                </Collapse>
                <Collapse in={this.props.scene.strobeDelayTF == TF.constant} className={classes.fullWidth}>
                  <TextField
                    variant="outlined"
                    label="For"
                    margin="dense"
                    value={strobeDelay}
                    onChange={this.onIntInput.bind(this, 'strobeDelay')}
                    onBlur={this.blurIntKey.bind(this, 'strobeDelay')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                    inputProps={{
                      step: 100,
                      min: 0,
                      type: 'number',
                    }}/>
                </Collapse>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} className={clsx((!this.props.scene.strobe || !this.props.scene.strobePulse) && classes.noPadding)}>
          <Collapse in={this.props.scene.strobe && this.props.scene.strobePulse && (this.props.scene.strobeDelayTF == TF.random || this.props.scene.strobeDelayTF == TF.sin)} className={classes.fullWidth}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 6}>
                <TextField
                  variant="outlined"
                  label="Between"
                  margin="dense"
                  value={strobeDelayMin}
                  onChange={this.onIntInput.bind(this, 'strobeDelayMin')}
                  onBlur={this.blurIntKey.bind(this, 'strobeDelayMin')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                  }}
                  inputProps={{
                    step: 100,
                    min: 0,
                    type: 'number',
                  }}/>
              </Grid>
              <Grid item xs={12} sm={this.props.sidebar ? 12 : 6}>
                <TextField
                  variant="outlined"
                  label="and"
                  margin="dense"
                  value={strobeDelayMax}
                  onChange={this.onIntInput.bind(this, 'strobeDelayMax')}
                  onBlur={this.blurIntKey.bind(this, 'strobeDelayMax')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                  }}
                  inputProps={{
                    step: 100,
                    min: 0,
                    type: 'number',
                  }}/>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    );
  }

  blurPercentIntKey(key: string, e: MouseEvent) {
    const min = (e.currentTarget as any).min ? (e.currentTarget as any).min : null;
    const max = (e.currentTarget as any).max ? (e.currentTarget as any).max : null;
    if (min && (this.props.scene as any)[key] * 100 < min) {
      this.changeIntKey(key, min);
    } else if (max && (this.props.scene as any)[key] * 100 > max) {
      this.changeIntKey(key, max);
    }
  }

  onPercentSliderChange(key: string, e: MouseEvent, value: number) {
    this.changeKey(key, value / 100);
  }

  onPercentIntInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    this.changeKey(key, input.value === '' ? '' : Number(input.value) / 100);
  }

  blurIntKey(key: string, e: MouseEvent) {
    const min = (e.currentTarget as any).min ? (e.currentTarget as any).min : null;
    const max = (e.currentTarget as any).max ? (e.currentTarget as any).max : null;
    if (min && (this.props.scene as any)[key] < min) {
      this.changeIntKey(key, min);
    } else if (max && (this.props.scene as any)[key] > max) {
      this.changeIntKey(key, max);
    }
  }

  onSliderChange(key: string, e: MouseEvent, value: number) {
    this.changeKey(key, value);
  }

  onBoolInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    const checked = input.checked;
    this.changeKey(key, checked);
  }

  onIntInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    this.changeKey(key, input.value === '' ? '' : Number(input.value));
  }

  onInput(key: string, e: MouseEvent) {
    const input = (e.target as HTMLInputElement);
    this.changeKey(key, input.value);
  }

  update(fn: (scene: any) => void) {
    this.props.onUpdateScene(this.props.scene, fn);
  }

  changeIntKey(key:string, intString: string) {
    this.changeKey(key, intString === '' ? '' : Number(intString));
  }

  changeKey(key: string, value: any) {
    this.update((s) => s[key] = value);
  }
}

export default withStyles(styles)(StrobeCard as any);