/**
* SingleLine Grid List
*/
import React from 'react';
import { GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// data File
import tileData from './tileData';

const styles = theme => ({
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	}
});

function ImageGridList(props) {
	const { classes } = props;
	return (
		<div>
			<GridList className={classes.gridList} cols={4.5}>
				{tileData.map(tile => (
					<GridListTile key={tile.img}>
						<img src={tile.img} alt={tile.title} />
						<GridListTileBar
							title={tile.title}
							actionIcon={
								<IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}

export default withStyles(styles)(ImageGridList);
