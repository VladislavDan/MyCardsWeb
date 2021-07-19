import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import * as fns from "date-fns";
import * as _ from "lodash";

import {DATE_FORMAT} from "../../common/Constants";
import {Task} from "../../types/Task";
import {CheckedPoint} from "../../types/CheckedPoint";
import Icon from "react-native-vector-icons/MaterialIcons";

export class TaskItemComponent extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };
    }

    render(): JSX.Element {
        let dateStart: string = fns.format(this.props.task.dateStart, DATE_FORMAT);
        let dateEnd: string = fns.format(this.props.task.dateEnd, DATE_FORMAT);
        return (
            <View style={styles.mainContainer}>
                {this.renderButton()}
                <TouchableOpacity style={styles.touchContainer} onPress={() => {
                    this.props.onPressItem(this.props.task)
                }}>
                    <View style={styles.container}>
                        <View style={styles.title_container}>
                            <Text style={styles.title} ellipsizeMode='tail'
                                  numberOfLines={1}>{this.props.task.name}</Text>
                        </View>
                        <Text style={styles.dates}>{dateStart} / {dateEnd} {" "}
                            <Icon size={16} name="alarm">
                            </Icon>
                            {" " + this.props.task.minutesADay}:00
                        </Text>
                        <Text style={styles.description} ellipsizeMode='tail'
                              numberOfLines={2}>{this.props.task.description}</Text>
                        <View style={styles.separator}/>
                    </View>
                </TouchableOpacity>
                <View style={this.setImportantStyle()}/>
            </View>
        );
    }

    renderButton() {
        let isChecked = this.props.task.checkedPoints && _.findIndex(this.props.task.checkedPoints, (item: CheckedPoint) => {
            return item.checkedDate === this.props.currentDate;
        }) !== -1;
        let isOverdue = this.props.currentDate > this.props.task.dateEnd;
        if (isOverdue) {
            return (
                <TouchableOpacity style={styles.checkButtonContainerStyle} onPress={() => {
                    this.onOverdueTask()
                }}>
                    <Icon size={25} name="help">
                    </Icon>
                </TouchableOpacity>
            )
        } else if (isChecked) {
            return (
                <TouchableOpacity style={styles.checkButtonContainerStyle} onPress={() => {
                    this.props.onUncompleteTask(this.props.onUncompleteTask(this.props.task.id))
                }}>
                    <Icon size={25} name="refresh">
                    </Icon>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.checkButtonContainerStyle} onPress={() => {
                    this.props.onOpenModal(this.props.task.id)}}>
                    <Icon size={25} name="check-box">
                    </Icon>
                </TouchableOpacity>
            )
        }
    }

    onOverdueTask = () => {
        Alert.alert(
            'Задача из прошлого',
            'Задание завершено. Если вы хотите продолжить его выполнение измените сроки.',
            [
                {
                    text: 'Ок', onPress: () => {
                    }
                }
            ],
            {cancelable: true}
        )
    };

    setImportantStyle() {
        switch (this.props.task.important) {
            case 1:
                return styles.importantIndicatorBlue;
            case 2:
                return styles.importantIndicatorGreen;
            case 3:
                return styles.importantIndicatorYellow;
            case 4:
                return styles.importantIndicatorRed;
            default:
                return styles.importantIndicatorBlue;
        }
    }
}

AppRegistry.registerComponent('TaskItemComponent', () => TaskItemComponent);

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        flexDirection: 'row'
    },

    touchContainer: {
        flex: 7,
        flexDirection: 'row'
    },

    container: {
        flex: 1,
        marginLeft: 5,
        flexDirection: 'column'
    },

    title_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 16,
        color: '#000000'
    },

    dates: {
        fontSize: 14,
        color: '#737373'
    },

    description: {
        fontSize: 14,
        color: '#737373',
        marginTop: 5,
        marginBottom: 5
    },

    separator: {
        height: 1,
        backgroundColor: '#d5d6d8'
    },

    importantIndicatorBlue: {
        width: 10,
        height: '100%',
        backgroundColor: '#01a1d8'
    },

    importantIndicatorGreen: {
        width: 10,
        backgroundColor: '#18d84e'
    },

    importantIndicatorYellow: {
        width: 10,
        backgroundColor: '#d8d602'
    },

    importantIndicatorRed: {
        width: 10,
        backgroundColor: '#ed7368'
    },

    checkButtonStyle: {
        height: 35,
        width: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    checkButtonContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

interface Props {
    task: Task;
    onPressItem: any;
    onUncompleteTask: any;
    onOpenModal: any;
    currentDate: number;
}

interface State {
    modalVisible: boolean;
}
