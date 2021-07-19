import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {File} from "../../types/File"

export class BackupItemComponent extends Component<Props, State>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onClickBackup}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.file.name}</Text>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableOpacity>
        );
    }

    onClickBackup = () => {
        this.props.onClickBackup(this.props.file.id)
    }
}

AppRegistry.registerComponent('BackupItemComponent', () => BackupItemComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#000000'
    },
    separator: {
        height: 1,
        backgroundColor: '#d5d6d8'
    }
});

interface Props {
    file: File,
    onClickBackup: any
}

interface State { }

