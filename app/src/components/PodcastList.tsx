import { Show } from "podcast-list-models";
import { ListItem, List, ListItemAvatar, Avatar, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";

/**
 * PodcastList styles
 */
const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    listItem: {
        width: "500px"
    }
}));

/**
 * PodcastList props
 */
interface PodcastListProps {
    width?: string,
    podcasts: Show[]
}

/**
 * Returns the PodcastList component
 * 
 * @param props PodcastList props
 */
export const PodcastList = (props: PodcastListProps) => {

    const classes = useStyles()

    /**
     * The rendered list of podcasts
     */
    const items = props.podcasts.map(podcast => (
        <ListItem key={podcast.id}>
            <ListItemAvatar>
                <Avatar src={podcast.imageUrl} />
            </ListItemAvatar>
            <ListItemText primary={podcast.name} secondary={podcast.publisher} />
        </ListItem>
    ))

    return (
        <div className={classes.container}>
            <List style={{ width: props.width ?? "500px" }}>
                {items}
            </List>
        </div>
    )

}