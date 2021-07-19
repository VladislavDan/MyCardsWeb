import * as _ from "lodash";
import React, {Component} from "react";
import {
    Alert,
    AppRegistry, Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import {NavigationScreenProp} from "react-navigation";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {addCard} from "../../actions/addCard";
import {changeCard} from "../../actions/changeCard";
import {DATE_FORMAT, RANGE_OF_KNOWLEDGE} from "../../common/Constants";
import {AppState} from "../../types/AppState";
import {Card} from "../../types/screens/cards-screen/Card";
import {CardsGroup} from "../../types/screens/cards-screen/CardsGroup";
import {CheckBox} from "react-native-elements";

class NewCardComponent extends Component<Props, State> {

    private card: Card;
    private disableMultipleClick: boolean = false;

    constructor(props) {
        super(props);

        this.card = this.props.navigation.getParam("card");
        if (this.card) {
            this.state = {
                answer: this.card.answer,
                question: this.card.question,
                chosenGroups: this.card.teamIds
            };
        } else {
            this.state = {
                answer: "",
                question: "",
                chosenGroups: [this.props.navigation.getParam("teamId")]
            };
        }


    }

    public render() {
        return <View style={styles.container}>
            <TextInput
                style={{height: 40}}
                placeholder="Введите вопрос"
                onChangeText={(text) => this.setState({question: text})}
                value={this.state.question}
            />
            <TextInput
                style={{height: 200}}
                placeholder="Введите ответ"
                multiline={true}
                onChangeText={(text) => this.setState({answer: text})}
                value={this.state.answer}
            />
            <FlatList
                data={this.props.cardsGroups}
                extraData={this.state}
                keyExtractor={(item: CardsGroup, index) => item.dateCreating.toString()}
                renderItem={(renderItemInfo: ListRenderItemInfo<CardsGroup>) => {
                    return <CheckBox
                        title={renderItemInfo.item.nameCardsGroup}
                        checked={this.isChecked(renderItemInfo)}
                        iconType="material"
                        checkedIcon="clear"
                        uncheckedIcon="add"
                        checkedColor="red"
                        onPress={() => {
                            let stateClone = _.cloneDeep(this.state.chosenGroups);
                            if(_.findIndex(stateClone, (groupId) => groupId === renderItemInfo.item.dateCreating) > -1) {
                                _.remove(stateClone, (groupId)=> groupId === renderItemInfo.item.dateCreating);
                            } else {
                                stateClone.push(renderItemInfo.item.dateCreating);
                            }
                            this.setState({
                                chosenGroups: stateClone
                            })
                        }}
                    />;
                }
                }
            />
            <Button
                disabled={this.disableMultipleClick}
                onPress={() => {
                this.disableMultipleClick = true;
                if (this.state.question && this.state.answer) {
                    if (this.card) {
                        this.props.changeCard({
                            dateCreating: this.card.dateCreating,
                            question: this.state.question,
                            answer: this.state.answer,
                            dateRepeating: null,
                            teamIds: this.state.chosenGroups,
                            rangeOfKnowledge: RANGE_OF_KNOWLEDGE.NOT_FAMILIAR_CARD
                        });
                    } else {
                        this.props.addCard({
                            dateCreating: new Date().getTime(),
                            question: this.state.question,
                            answer: this.state.answer,
                            dateRepeating: null,
                            teamIds: this.state.chosenGroups,
                            rangeOfKnowledge: RANGE_OF_KNOWLEDGE.NOT_FAMILIAR_CARD
                        });
                    }
                    this.props.navigation.goBack();
                } else {
                    Alert.alert(
                        "Ошибка",
                        "Название темы пустое",
                        [{
                            text: "OK", onPress: () => {
                            }
                        },],
                        {cancelable: true}
                    );
                }
            }}
                    color="#ABABAB"
                    title="Сохранить"/>
        </View>;
    }

    private isChecked(renderItemInfo) {
        return _.findIndex(this.state.chosenGroups, (groupId) => groupId === renderItemInfo.item.dateCreating) > -1
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 10
    },
    scoreContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    scoreStyle: {
        padding: 5
    },
    colorRed: {
        color: "red"
    },
    colorYellow: {
        color: "#d8d602"
    },
    colorGreen: {
        color: "green"
    },
    cardContainer: {
        flexDirection: "column",
        height: 400,
        backgroundColor: "white",
        margin: 5,
        borderWidth: 4,
        borderColor: "#ed7368",
        justifyContent: "center",
        alignItems: "center"
    },
    questionAnswerText: {
        fontWeight: "bold",
        fontSize: 22,
        color: "black"
    },
    borderGreen: {
        borderColor: "green"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        height: 30,
        borderWidth: 2,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "#ed7368"
    }
});

AppRegistry.registerComponent("NewCardComponent", () => NewCardComponent);

function mapStateToProps(state: AppState) {
    const cards: Card[] = _.cloneDeep(state.cards.cardsCollection);
    const cardsGroups: CardsGroup[] = _.cloneDeep(state.cardsGroups);
    return {
        cards,
        cardsGroups
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCard: bindActionCreators(addCard, dispatch),
        changeCard: bindActionCreators(changeCard, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardComponent);

interface Props {
    cardsGroups: CardsGroup[];
    navigation: NavigationScreenProp<any, any>;

    addCard(card: Card);

    changeCard(card: Card);
}

interface State {
    answer: string;
    question: string;
    chosenGroups: number[];
}
