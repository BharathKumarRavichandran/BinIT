import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Bins from "../../pages/Hospital/Bins";
import BinDetails from "../../pages/Hospital/BinDetails";
import Handlers from "../../pages/Hospital/Handlers";
import Transits from "../../pages/Transits";
import Logs from "../../pages/Hospital/Logs";
import Polybags from "../../pages/Hospital/Polybags";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route exact path="/hospital/bins" component={Bins} />
              <Route path="/hospital/bins/:binId" component={BinDetails} />
              <Route path="/hospital/handlers" component={Handlers} />
              <Route path="/hospital/transits" component={Transits} />
              <Route path="/hospital/logs" component={Logs} />
              <Route path="/hospital/polybags" component={Polybags} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
