import * as React from "react";
import clsx from "clsx";
import {remote} from "electron";

import {
  Button,
  createStyles, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, IconButton,
  Link, SvgIcon,
  Theme,
  withStyles
} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import HttpIcon from '@material-ui/icons/Http';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MovieIcon from '@material-ui/icons/Movie';

import {PT, SDT, SPT, TF} from "../data/const";
import {Route} from "../data/Route";
import Config from "../data/Config";
import Scene from "../data/Scene";

const styles = (theme: Theme) => createStyles({
  deleteIcon: {
    color: theme.palette.error.main,
  },
  leftDialog: {
    justifyContent: 'flex-start',
  },
  rightDialog: {
    justifyContent: 'flex-end',
  },
  topDialog: {
    alignItems: 'flex-start',
  },
  bottomDialog: {
    alignItems: 'flex-end',
  },
});

class Tutorial extends React.Component {
  readonly props: {
    classes: any,
    config: Config,
    route: Route[],
    scene: Scene,
    tutorial: string,
    onDoneTutorial(lastTutorial: string): void,
    onSetTutorial(nextTutorial: string): void,
    onSkipAllTutorials(): void,
  };

  render() {
    const classes = this.props.classes;
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;
    let maxWidth = "sm";

    let dialogBody = <div/>;
    if (!this.props.tutorial) return dialogBody;
    switch (this.props.tutorial) {
      case SPT.welcome:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Welcome to FlipFlip!</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Welcome and thank you for using FlipFlip. Let's get you started!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onSkipAll.bind(this)} color="inherit" className={classes.deleteIcon}>
                Skip ALL Tutorials
              </Button>
              <Button onClick={this.onSkip.bind(this)} color="secondary">
                Skip This Tutorial
              </Button>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SPT.scenePicker:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Picker (Home)</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                This is the home screen of FlipFlip, where you can get to your <b>Scenes</b>, your <b>Library</b>, and to <b>Settings</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Click the Hamburger button to expand the sidebar</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SPT.drawer:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Picker (Home)</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Your Scenes are divided into 3 different tabs: <b>Scenes</b>, <b>Scene Generators</b>, and <b>Scene Grids</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                From the sidebar, you can also access your Library, open another window, or access Settings.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SPT.add1:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Picker (Home)</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Let's get started using FlipFlip by making our first scene!
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Click the Add button</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SPT.add2:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Picker (Home)</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Let's get started using FlipFlip by making our first scene!
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Click the Add button
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Now click the "Add New Scene Button"</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;


      case SDT.welcome:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Detail</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You've started your first Scene! A Scene is the main component of FlipFlip, where you can specify all your effects and options.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onSkip.bind(this)} color="secondary">
                Skip Tutorial
              </Button>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.title:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Detail</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Each Scene has a name, this is what will appear back on the Scene Picker.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>You can edit a Scene's name by clicking it</b>, but we'll leave it as "Cute Stuff" for now.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.add1:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Sources</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                The most important part of any Scene is its <b>sources</b>. This is a list of places (local or remote) FlipFlip will pull from.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                To add our first source <b>Click the add button</b>.
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.add2:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Sources</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                From here, we can:
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <LocalLibraryIcon /> Import Sources from the Library
                <br/>
                <MovieIcon /> Add Local Videos
                <br/>
                <FolderIcon /> Add Local Directories
                <br/>
                <HttpIcon /> Add Individual URLs
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                For this tutorial, we'll add a single URL. <b>Click the URL button</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.source:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Sources</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Great! Usually, you'd enter the URL for your source, but we've gone ahead and added cute animals for now.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Actions have been disabled for this tutorial, but <b>let's look at each part of the source...</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.sourceAvatar:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Source</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Next to each source is its <b>Avatar</b>. This will display the <b>type of source</b> (Tumblr in this case) and you
                can <b>click it</b> to do the following:
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Click: <b>Tag this Source</b> (this only works for sources in your Library)
                <br/>
                Shift+Click: <b>Externally opens url/directory</b>
                <br/>
                Ctrl+Click: <b>Opens caching directory</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.sourceTitle:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Source</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                This is the <b>URL</b> of the source. <b>You can edit the URL by clicking it</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.sourceTags:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Source</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                These are the source's <b>Tags</b>. <b>You can add/remove tags and tag sources in the Library</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.sourceCount:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Source</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                This is the source's <b>Count</b>. Each source remebers the number of images/videos available. When a <b>+</b> is next to the number, that means the count is incomplete, and there may be more images/videos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.sourceButtons:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Source</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                At the end of each source are some <b>Actions</b>. These will only appear for relevant sources:
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <SvgIcon>
                  <path d="M11 21H7V19H11V21M15.5 19H17V21H13V19H13.2L11.8 12.9L9.3 13.5C9.2 14 9 14.4 8.8
                          14.8C7.9 16.3 6 16.7 4.5 15.8C3 14.9 2.6 13 3.5 11.5C4.4 10 6.3 9.6 7.8 10.5C8.2 10.7 8.5
                          11.1 8.7 11.4L11.2 10.8L10.6 8.3C10.2 8.2 9.8 8 9.4 7.8C8 6.9 7.5 5 8.4 3.5C9.3 2 11.2
                          1.6 12.7 2.5C14.2 3.4 14.6 5.3 13.7 6.8C13.5 7.2 13.1 7.5 12.8 7.7L15.5 19M7 11.8C6.3
                          11.3 5.3 11.6 4.8 12.3C4.3 13 4.6 14 5.3 14.4C6 14.9 7 14.7 7.5 13.9C7.9 13.2 7.7 12.2 7
                          11.8M12.4 6C12.9 5.3 12.6 4.3 11.9 3.8C11.2 3.3 10.2 3.6 9.7 4.3C9.3 5 9.5 6 10.3 6.5C11
                          6.9 12 6.7 12.4 6M12.8 11.3C12.6 11.2 12.4 11.2 12.3 11.4C12.2 11.6 12.2 11.8 12.4
                          11.9C12.6 12 12.8 12 12.9 11.8C13.1 11.6 13 11.4 12.8 11.3M21 8.5L14.5 10L15 12.2L22.5
                          10.4L23 9.7L21 8.5M23 19H19V21H23V19M5 19H1V21H5V19Z" />
                </SvgIcon> Clip Video (Displays for video sources)
                <br/>
                <SvgIcon>
                  <path d="M2 6V8H14V6H2M2 10V12H11V10H2M14.17 10.76L12.76 12.17L15.59 15L12.76 17.83L14.17
                          19.24L17 16.41L19.83 19.24L21.24 17.83L18.41 15L21.24 12.17L19.83 10.76L17 13.59L14.17
                          10.76M2 14V16H11V14H2Z" />
                </SvgIcon> Clear Blacklist (Displays for sources that have a blacklist)
                <br/>
                <SvgIcon>
                  <path d="M19.36 2.72L20.78 4.14L15.06 9.85C16.13 11.39 16.28 13.24 15.38 14.44L9.06
                            8.12C10.26 7.22 12.11 7.37 13.65 8.44L19.36 2.72M5.93 17.57C3.92 15.56 2.69 13.16 2.35
                            10.92L7.23 8.83L14.67 16.27L12.58 21.15C10.34 20.81 7.94 19.58 5.93 17.57Z" />
                </SvgIcon> Clean Cache (Displays while caching is enabled)
                <br/>
                <DeleteIcon className={classes.deleteIcon} color="inherit"/> Delete Source
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.options1:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Detail</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Now that we have a source to play from, let's choose some options for our scene.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                The Scene Detail page has 4 tabs: <b>Options</b>, <b>Effects</b>, <b>Audio/Text</b>, and <b>Sources</b>
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Click the OPTIONS tab</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.options2:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Options</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                This is the options tab. Here you can customize things like <b>scene timing</b> and <b>image filters</b>,
                as well as setting up <b>next scenes</b> and <b>overlays</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.optionsLeft:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Options</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                On the first card ..
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.timing:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Timing</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can control <b>how rapidly images should change</b>. It could be at a <b>constant</b> rate, <b>randomly</b>, in a <b>wave</b>, or even to the <b>bpm</b> of an audio track!
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>Let's keep it here: changing <b>constantly, every 1 second</b></i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.imageSizing:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Image/Background</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can choose <b>how to size the images</b> and <b>what background to use</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.nextScene:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Next Scene</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can <b>link scenes together</b>! Just choose the <b>next scene</b> to play and <b>how many <u>seconds</u></b> it should start after.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>We'll leave this disabled for this tutorial</i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.overlays:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Overlays</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can <b>overlay scenes</b> on top of this one! Just <b>add a scene</b> to overlay and choose its <b>opacity</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                While FlipFlip doesn't impose any direct limit on the number of overlays, please be aware that <b>additional overlays will negatively impact performance</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>We'll leave this disabled for this tutorial</i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.optionsRight:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Options</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                On the second card ..
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.imageOptions:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Image Options</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can <b>filter images</b> to just <b>videos</b>, <b>animated</b>, or <b>stills</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                You can also <b>control how long GIFs will play</b> for. This takes priority over scene timing.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>We'll keep it allowing <b>All Images</b></i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.videoOptions:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Video Options</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can <b>control how long videos will play</b> for. You can also choose to <b>start videos at a random
                timestamp</b> and/or to <b>have videos continue</b> (rather than restart each time they appear).
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Lastly, you can <b>choose to use Clips or not</b>. Clips can only be created for individual videos and
                must be manually created in the <b>Video Clipper</b>. If no clips are present, the whole video will be used.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                If clips are disabled, you can choose to <b>skip the first and last parts</b> of all videos (to help skipping intro/credits)
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.weighting:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Weighing</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                ... choose how to weigh our images. We can either <b>weigh by source</b> or <b>weigh by image</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Weighing by Source</b> means that each <i>source</i> will be treated equally, regardless of how many images it has.
                <br/>
                <i>Sources with a low number of images may cause undesirable repeats.</i>
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Weighing by Image</b> means that each <i>image</i> will be treated equally, regardless of its source.
                <br/>
                <i>Sources with a high number of images may overwhelm other sources.</i>
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>Since we only have 1 source, it <b>doesn't matter</b></i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.ordering:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Ordering</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                You can choose how to order our images. Typically, it's best to use <b>random</b>, but you may want to <b>order</b> or even <b>strictly order</b> your sources.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Typically, FlipFlip will show images in the order they load. However, <b>strictly ordered</b> will force
                FlipFlip to wait for the next image to be ready before displaying.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>We'll keep it ordered <b>randomly</b></i>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.effects1:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Detail</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Based on our options, we are using <b>all images</b> and they will <b>change every 1 second</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Now, let's add some effects! <b>Click the EFFECTS Tab</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.effects2:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Effects</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                This is the effects tab. Here you can toggle and customize effects: <b>zoom/move</b>, <b>cross fade</b> and <b>strobe</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i><b>Audio tracks</b> and <b>text overlays</b> are located in the Audio/Text tab.</i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.zoom1:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Effects</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Let's add some effects to our scene. <b>First, enable Zoom</b>.
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.zoom2:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Zoom</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                We just want a mild zoom.
                <br/>
                So <b>set Zoom Start to <u>0.8</u></b> and <b>set Zoom End to <u>1.2</u></b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.zoom3:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Zoom</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Great! Now let's change the zoom timing to be <b>Wave</b>.
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.zoom4:
        right = true;
        bottom = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Zoom</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Since our scene is changing every second, we'll leave the <b>wave between <u>1000 ms</u> and <u>2000 ms</u></b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.fade1:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Fade</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Great! Now, let's <b>enable Cross-Fade</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;
      case SDT.fade2:
        left = true;
        top = true;
        maxWidth = "xs";
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Fade</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                We'll leave this <b>fading at <u>500 ms</u></b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case SDT.play:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Scene Detail</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Finally, our scene is ready to play!
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Press the Play button to begin</b>
              </DialogContentText>
            </DialogContent>
          </React.Fragment>;
        break;


      case PT.welcome:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Player</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Welcome to your first Scene! Here your Scene will play out according to your configuration.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onSkip.bind(this)} color="secondary">
                Skip Tutorial
              </Button>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case PT.toolbar:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Player</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Up at the top is the <b>toolbar</b>. Here you can <b>control the Scene playback</b> or <b>return to Scene Detail</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case PT.sidebar:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Player</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                To the left is a <b>sidebar</b> with almost all of the <b>options and effects from Scene Detail</b>.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>To improve performance</b>, each section is compressed until needed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case PT.tagging:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Player</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                While <b>Tagging a source</b> in your <b>Library</b>, the set of tags will appear when you hover near the bottom.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <i>Since we're not tagging, <b>there's nothing there</b>.</i>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Continue
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
      case PT.final:
        dialogBody =
          <React.Fragment>
            <DialogTitle id="tutorial-title">Player</DialogTitle>
            <DialogContent>
              <DialogContentText id="tutorial-description">
                Well that about covers all the basics! You've learned how to <b>add a Scene</b>, <b>configure it</b>, and <b>begin playback</b>!
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                Be sure to check out the <Link href="#" onClick={this.openLink.bind(this, "https://ififfy.github.io/flipflip/#")}>FlipFlip docs</Link> if you need any help.
              </DialogContentText>
              <DialogContentText id="tutorial-description">
                <b>Enjoy FlipFlip!</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onContinue.bind(this)} color="primary">
                Back to Player
              </Button>
            </DialogActions>
          </React.Fragment>;
        break;
    }

    return(
      <Dialog
        maxWidth={maxWidth as any}
        open={!!this.props.tutorial}
        classes={{container: clsx(left && classes.leftDialog, right && classes.rightDialog, top && classes.topDialog, bottom && classes.bottomDialog)}}
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description">
        {dialogBody}
      </Dialog>
    );
  }

  componentDidMount() {
    this.showNextTutorial();
  }

  componentDidUpdate() {
    this.showNextTutorial();
  }

  setTutorial(tutorial: string) {
    if (this.props.tutorial != tutorial) {
      console.log("Set - " + tutorial);
      this.props.onSetTutorial(tutorial);
    }
  }

  showNextTutorial() {
    switch (this.getRoute()) {
      case "picker":
        switch (this.props.config.tutorials.scenePicker) {
          case SPT.welcome:
            this.setTutorial(SPT.scenePicker);
            return;
          case SPT.scenePicker:
            this.setTutorial(SPT.drawer);
            return;
          case SPT.drawer:
            this.setTutorial(SPT.add1);
            return;
          case SPT.add1:
            this.setTutorial(SPT.add2);
            return;
          case SPT.add2:
          case SPT.done:
            // We're done, don't show
            this.setTutorial(null);
            return;
          default:
            this.setTutorial(SPT.welcome);
            return;
        }
      case "scene":
        switch (this.props.config.tutorials.sceneDetail) {
          case SDT.welcome:
            this.setTutorial(SDT.title);
            return;
          case SDT.title:
            this.setTutorial(SDT.add1);
            return;
          case SDT.add1:
            this.setTutorial(SDT.add2);
            return;
          case SDT.add2:
            this.setTutorial(SDT.source);
            return;
          case SDT.source:
            this.setTutorial(SDT.sourceAvatar);
            return;
          case SDT.sourceAvatar:
            this.setTutorial(SDT.sourceTitle);
            return;
          case SDT.sourceTitle:
            this.setTutorial(SDT.sourceTags);
            return;
          case SDT.sourceTags:
            this.setTutorial(SDT.sourceCount);
            return;
          case SDT.sourceCount:
            this.setTutorial(SDT.sourceButtons);
            return;
          case SDT.sourceButtons:
            this.setTutorial(SDT.options1);
            return;
          case SDT.options1:
            this.setTutorial(SDT.options2);
            return;
          case SDT.options2:
            this.setTutorial(SDT.optionsLeft);
            return;
          case SDT.optionsLeft:
            this.setTutorial(SDT.timing);
            return;
          case SDT.timing:
            this.setTutorial(SDT.imageSizing);
            return;
          case SDT.imageSizing:
            this.setTutorial(SDT.nextScene);
            return;
          case SDT.nextScene:
            this.setTutorial(SDT.overlays);
            return;
          case SDT.overlays:
            this.setTutorial(SDT.optionsRight);
            return;
          case SDT.optionsRight:
            this.setTutorial(SDT.imageOptions);
            return;
          case SDT.imageOptions:
            this.setTutorial(SDT.videoOptions);
            return;
          case SDT.videoOptions:
            this.setTutorial(SDT.weighting);
            return;
          case SDT.weighting:
            this.setTutorial(SDT.ordering);
            return;
          case SDT.ordering:
            this.setTutorial(SDT.effects1);
            return;
          case SDT.effects1:
            this.setTutorial(SDT.effects2);
            return;
          case SDT.effects2:
            if (this.props.scene.zoom == true) {
              this.props.onDoneTutorial(SDT.zoom1);
            } else {
              this.setTutorial(SDT.zoom1);
            }
            return;
          case SDT.zoom1:
            if (this.props.scene.zoomStart == 0.8 && this.props.scene.zoomEnd == 1.2) {
              this.props.onDoneTutorial(SDT.zoom2);
            } else {
              this.setTutorial(SDT.zoom2);
            }
            return;
          case SDT.zoom2:
            if (this.props.scene.transTF == TF.sin) {
              this.props.onDoneTutorial(SDT.zoom3);
            } else {
              this.setTutorial(SDT.zoom3);
            }
            return;
          case SDT.zoom3:
            this.setTutorial(SDT.zoom4);
            return;
          case SDT.zoom4:
            if (this.props.scene.crossFade) {
              this.props.onDoneTutorial(SDT.fade1);
            } else {
              this.setTutorial(SDT.fade1);
            }
            return;
          case SDT.fade1:
            this.setTutorial(SDT.fade2);
            return;
          case SDT.fade2:
            this.setTutorial(SDT.play);
            return;
          case SDT.play:
          case SDT.done:
            // We're done, don't show
            this.setTutorial(null);
            return;
          default:
            return;
        }
      case "play":
        switch (this.props.config.tutorials.player) {
          case PT.welcome:
            this.setTutorial(PT.toolbar);
            return;
          case PT.toolbar:
            this.setTutorial(PT.sidebar);
            return;
          case PT.sidebar:
            this.setTutorial(PT.tagging);
            return;
          case PT.tagging:
            this.setTutorial(PT.final);
            return;
          case PT.final:
          case PT.done:
            // We're done, don't show
            this.setTutorial(null);
            return;


        }
    }
  }

  onSkipAll() {
    this.props.onSkipAllTutorials();
  }

  onSkip() {
    this.props.onDoneTutorial('done');
  }

  onContinue() {
    this.props.onDoneTutorial(this.props.tutorial);
  }

  getRoute() {
    if (this.props.route.length < 1) return "picker";
    return this.props.route[this.props.route.length - 1].kind;
  }

  openLink(url: string) {
    remote.shell.openExternal(url);
  }
}

export default withStyles(styles)(Tutorial as any);