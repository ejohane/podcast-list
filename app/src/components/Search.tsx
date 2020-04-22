import { useState } from "react"
import React from "react";
import { InputBase, makeStyles, fade, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { SortDirection } from "podcast-list-models";

/**
 * Search styles
 */
const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
    },
}));


/**
 * Search props
 */
interface SearchProps {
    onSearch?: (searchValue: string) => void
    onSortChange?: (sort: SortDirection) => void
    wait?: number
    enableSort?: boolean
}

/**
 * Returns the Search component
 * 
 * @param props Search props
 */
export const Search = (props: SearchProps) => {

    const classes = useStyles();

    const [searchTimeout, setSearchTimeout] = useState(undefined)

    const [sortState, setSortState] = useState<SortDirection>(SortDirection.Ascending)

    let searchValue: string



    /**
     * Event handler whenever the search input changes.
     * 
     * This handler will only fire off the 'onSearch' callback
     * after a user has completed typing in their search criteria.
     * 
     * The amount of time to wait to fire off the 'onSearch' event
     * is configurable by the 'wait' prop.
     * 
     * @param event 
     */
    const onChange = (event) => {
        clearTimeout(searchTimeout)

        searchValue = event.target.value

        setSearchTimeout(setTimeout(invokeOnSearch, props.wait ?? 250))
    }

    /**
     * The timeout handler for when a user completes their
     * search criteria.
     */
    const invokeOnSearch = () => {
        setSortState(SortDirection.None)
        props.onSearch(searchValue)
    }

    /**
     * Event handler when a user clicks sort
     * 
     * This handler updates the sort state and fires off
     * the 'onSortChange' event.
     * 
     */
    const onSort = () => {

        let sort: SortDirection

        switch (sortState) {
            case SortDirection.None:
                sort = SortDirection.Ascending
                break
            case SortDirection.Ascending:
                sort = SortDirection.Descending
                break
            case SortDirection.Descending:
                sort = SortDirection.Ascending
                break
        }

        setSortState(sort)

        props.onSortChange(sort)
    }

    /**
     * Event handler when user presses key on input
     * 
     * @param event 
     */
    const onKeyPress = (event) => {
        // if user hits enter key
        if (event.keyCode === 13) {
            event.preventDefault();
            invokeOnSearch()
        }
    }

    return (
        <div className={classes.container}>
            <div style={{ width: "100%" }}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search for a Podcast"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
            <div>
                <IconButton aria-label="sort" onClick={onSort} disabled={!props.enableSort} style={props.enableSort ? { color: "white" } : { color: "#6c6c6c" }}>
                    <SortByAlphaIcon />
                </IconButton>
            </div>
        </div>
    )
}