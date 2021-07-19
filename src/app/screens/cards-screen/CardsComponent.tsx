import * as fns from "date-fns"
import * as _ from "lodash"
import React, {Component} from "react"
import {Alert, FlatList, ListRenderItemInfo, Text, TouchableOpacity, StyleSheet, View, AppRegistry} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import ActionButton from "react-native-action-button"
import {DATE_FORMAT, STACK_NAVIGATION_ROUTES_NAMES} from "../../common/Constants"
import {Card} from "../../types/screens/cards-screen/Card"
import {SearchBar} from 'react-native-elements'
import {CardsManager} from './CardsManager'

export class CardsComponent extends Component<IProps, IState> {

    public manager: CardsManager;
    public navigationSubscription;

    constructor(props) {
        super(props);

        this.state = {
            answer: "",
            question: "",
            cardsGroupId: -1,
            searchBarVisible: false,
            searchText: "",
            cards: [],
            isError: false
        };
    }

    public componentDidMount(): void {
        const {cardsGroupId} = this.props.route.params;
        this.setState({
            cardsGroupId
        })
        this.manager = new CardsManager();
        this.manager.cardsChannel.subscribe((cards: Card[]) => {
            this.setState({
                cards
            });
        });
        this.manager.errorChannel.subscribe((error) => {
            console.error(error);
            this.setState({isError: true});
        });
        this.navigationSubscription = this.props.navigation.addListener('focus', () => {
            this.manager.initializeCardsChannel.next(this.props.route.params.cardsGroupId);
        });
    }

    public componentWillUnmount(): void {
        this.manager.destroy();
        this.navigationSubscription();
    }

    private showSearchBar() {
        if (!this.state.searchBarVisible) {
            this.setState({searchBarVisible: true});
        } else {
            this.setState({searchBarVisible: false});
        }
    }

    public getStyleForIndicator(card: Card) {
        switch (card.rangeOfKnowledge) {
            case 0:
                return styles.not_familiar_indicator;
            case 1:
                return styles.low_familiar_indicator;
            default:
                return styles.more_familiar_indicator;
        }
    }

    public render() {
        return <View style={styles.container}>
            {this.state.searchBarVisible ? (<SearchBar
                inputStyle={{backgroundColor: "white"}}
                style={{borderColor: "#bbb", borderWidth: 0}}
                onChangeText={(searchText) => {
                    this.setState({
                            searchText: searchText
                        });
                }}
                containerStyle={{backgroundColor: "white", borderBottomColor: "#bbb", borderTopColor: "#bbb"}}
                placeholder=" Search..."/>) : null}
            {this.state.cards.length ? <View/> : null}
            {this.state.cards.length ? (
                <View style={styles.container}>
                    <Text style={styles.header}>Количество карточек: {this.state.cards.length}</Text>
                    <FlatList
                        data={_.filter(this.state.cards, (card: Card)=>{
                            return card.question.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 ||
                                card.answer.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1;
                        })}
                        keyExtractor={(item: Card, index) => index.toString()}
                        renderItem={(renderItemInfo: ListRenderItemInfo<Card>) =>
                            <TouchableOpacity
                                style={{
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginLeft: 10,
                                    height: 60
                                }}
                                onPress={() => {
                                    Alert.alert(
                                        "Внимание",
                                        "Вы хотите удалить или изменить карточку",
                                        [
                                            {
                                                text: "Удалить",
                                                onPress: () => {
                                                    Alert.alert(
                                                        "Внимание",
                                                        "Вы хотите удалить карточку",
                                                        [
                                                            {
                                                                text: "Да",
                                                                onPress: () => {
                                                                    // this.props.deleteCard(
                                                                    //     renderItemInfo.item.dateCreating
                                                                    // );
                                                                }
                                                            },
                                                            {
                                                                text: "Нет"
                                                            },
                                                        ],
                                                        {cancelable: true}
                                                    );
                                                }
                                            },
                                            {
                                                text: "Изменить", onPress: () => {
                                                    //TODO
                                                    // this.props.navigation.navigate("NewCard", {
                                                    //     teamId: this.state.cardsGroupId,
                                                    //     card: renderItemInfo.item
                                                    // });
                                                }
                                            },
                                            {
                                                text: "Повторить", onPress: () => {
                                                    //TODO
                                                    // this.props.navigation.navigate("SingleCardTraining", {
                                                    //     card: renderItemInfo.item
                                                    // });
                                                }
                                            }
                                        ],
                                        {cancelable: true}
                                    );
                                }}
                            >
                                <View style={styles.container}>
                                    <View style={styles.card_container}>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.question} ellipsizeMode="tail" numberOfLines={1}>
                                                Вопрос: {renderItemInfo.item.question}
                                            </Text>
                                            <Text style={styles.answer} ellipsizeMode="tail" numberOfLines={1}>
                                                Ответ: {renderItemInfo.item.answer}
                                            </Text>
                                            <Text
                                                style={[styles.answer, styles.dates]}
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                            >
                                                Последнее повторение: {
                                                renderItemInfo.item.dateRepeating ?
                                                    fns.format(renderItemInfo.item.dateRepeating, DATE_FORMAT) :
                                                    "-------------------"
                                            }
                                            </Text>
                                        </View>
                                        <View style={
                                            this.getStyleForIndicator(renderItemInfo.item)
                                        }/>
                                    </View>
                                    <View style={styles.separator}/>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                        <ActionButton.Item
                            buttonColor="#9b59b6"
                            title="Повторить"
                            onPress={() => this.props.navigation.navigate(STACK_NAVIGATION_ROUTES_NAMES.REPEATER_SCREEN, {cardsGroupId: this.state.cardsGroupId})}
                        >
                            <Icon size={20} color={"white"} name="timeline"/>
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor="#3498db"
                            title="Добавить"
                            onPress={() => {
                                //TODO
                                // this.props.navigation.navigate("NewCard", {
                                //     teamId: this.state.cardsGroupId
                                // });
                            }}
                        >
                            <Icon size={20} color={"white"} name="add"/>
                        </ActionButton.Item>
                        {this.state.cardsGroupId > 0 ? <ActionButton.Item
                            buttonColor="#3498db"
                            title="Удалить тему"
                            onPress={() => {
                                Alert.alert(
                                    "Предупреждение",
                                    "Вы хотите удалить эту тему",
                                    [
                                        {
                                            text: "Да", onPress: () => {
                                                // this.props.deleteCardsGroup(this.state.teamId);
                                                // this.props.deleteGroupFromCards(this.state.teamId);
                                                // this.props.navigation.goBack();
                                            }
                                        },
                                        {
                                            text: "Нет"
                                        },
                                    ],
                                    {cancelable: true}
                                );
                            }}
                        >
                            <Icon size={20} color={"white"} name="remove"/>
                        </ActionButton.Item> : <View/>}
                    </ActionButton>
                </View>) : (<View style={styles.container}><Text>Нет карточек</Text>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Добавить"
                        onPress={() => {
                            //TODO
                            // this.props.navigation.navigate("NewCard", {
                            //     teamId: this.state.cardsGroupId
                            // });
                        }}
                    >
                        <Icon size={20} color={"white"} name="add"/>
                    </ActionButton.Item>
                    {this.state.cardsGroupId > 0 ? (<ActionButton.Item
                        buttonColor="#ed7368"
                        title="Удалить тему"
                        onPress={() => {
                            Alert.alert(
                                "Предупреждение",
                                "Вы хотите удалить эту тему",
                                [
                                    {
                                        text: "Да", onPress: () => {
                                            // this.props.deleteCardsGroup(this.state.teamId);
                                            // this.props.deleteGroupFromCards(this.state.teamId);
                                            // this.props.navigation.goBack();
                                        }
                                    },
                                    {
                                        text: "Нет"
                                    },
                                ],
                                {cancelable: true}
                            );
                        }}
                    >
                        <Icon size={20} color={"white"} name="remove"/>
                    </ActionButton.Item>) : <View/>}
                </ActionButton>
            </View>)}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#dd744c",
        padding: 5,
        color: "white"
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    card_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    more_familiar_indicator: {
        width: 10,
        height: 10,
        margin: 10,
        backgroundColor: "green",
        borderRadius: 100
    },
    low_familiar_indicator: {
        width: 10,
        height: 10,
        margin: 10,
        backgroundColor: "yellow",
        borderRadius: 100
    },
    not_familiar_indicator: {
        width: 10,
        height: 10,
        margin: 10,
        backgroundColor: "red",
        borderRadius: 100
    },
    subContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    separator: {
        height: 1,
        marginTop: 10,
        backgroundColor: "#d5d6d8"
    },
    question: {
        paddingLeft: 10,
        fontSize: 16
    },
    answer: {
        paddingLeft: 10
    },
    dates: {
        fontSize: 14,
        color: "#737373"
    },
    button: {
        height: 30,
        borderWidth: 2,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "#82b83f"
    },
    headerButtonsContainer: {
        flexDirection: "row"
    },
});

AppRegistry.registerComponent("CardsDetailsComponent", () => CardsComponent);


interface IProps {
    navigation: any;
    route: any;
}

interface IState {
    answer: string;
    question: string;
    cardsGroupId: number;
    searchBarVisible: boolean;
    searchText: string;
    cards: Card[];
    isError: boolean
}
