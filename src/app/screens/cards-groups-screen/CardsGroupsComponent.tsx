import * as _ from "lodash"
import React, {Component} from "react"
import {
    AppRegistry, FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View
} from "react-native"
import ActionButton from "react-native-action-button"
import * as fns from "date-fns"
import {DATE_FORMAT, STACK_NAVIGATION_ROUTES_NAMES} from "../../common/Constants"
import {Card} from "../../types/screens/cards-screen/Card"
import {CardsGroup} from "../../types/screens/cards-screen/CardsGroup"
import {CardsGroupsManager} from './CardsGroupsManager'

export class CardsGroupsComponent extends Component<IProps, IState> {

    public manager: CardsGroupsManager;
    public navigationSubscription;

    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            nameCardsGroup: "",
            isError: false,
            cardsGroups: [],
            cardsCount: 0
        }
    }

    public componentDidMount(): void {
        this.manager = new CardsGroupsManager()
        this.manager.errorChannel.subscribe((error) => {
            console.error(error)
            this.setState({isError: true})
        })
        this.manager.cardsChannel.subscribe(({cards, cardsGroups}) => {
            const styledCardsGroups = cardsGroups.map((cardsGroup: CardsGroup) => {
                cardsGroup.indicatorStyle = this.getStyleForIndicator(cardsGroup, cards)
                return cardsGroup
            })
            this.setState({
                cardsGroups: styledCardsGroups,
                cardsCount: cards.length
            })
        })
        this.navigationSubscription = this.props.navigation.addListener('focus', () => {
            this.manager.initializeCardsGroupsChannel.next()
        });
    }

    public componentWillUnmount(): void {
        this.navigationSubscription();
        this.manager.destroy()
    }

    public render() {
        return <View style={styles.container}>
            {this.state.cardsGroups.length > 0 ? (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            marginTop: 10,
                            marginLeft: 10,
                            height: 50
                        }}
                        onPress={() => {
                            this.props.navigation.navigate(STACK_NAVIGATION_ROUTES_NAMES.CARDS_SCREEN, {
                                cardsGroupId: -1
                            })
                            // this.props.setCurrentCardsTeam(-1);
                        }}
                    >
                        <Text
                            style={{
                                marginVertical: 15
                            }}>
                            All ({this.state.cardsCount ? this.state.cardsCount : 0})
                        </Text>

                        <View style={styles.separator}/>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.cardsGroups}
                        keyExtractor={(item: CardsGroup) => item.dateCreating.toString()}
                        renderItem={(renderItemInfo: ListRenderItemInfo<CardsGroup>) => {
                            return <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    marginRight: 10
                                }}
                                onPress={() => {
                                    this.props.navigation.navigate(STACK_NAVIGATION_ROUTES_NAMES.CARDS_SCREEN, {
                                        cardsGroupId: renderItemInfo.item.dateCreating,
                                    })
                                }}
                            >
                                <View style={styles.card_container}>
                                    <View style={styles.main_information_container}>
                                        <Text
                                            ellipsizeMode="tail"
                                            numberOfLines={1}
                                            style={styles.title}>
                                            Название группы: {renderItemInfo.item.nameCardsGroup}
                                        </Text>
                                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>Дата
                                            последнего повтора: {
                                                renderItemInfo.item.dateRepeating ?
                                                    fns.format(renderItemInfo.item.dateRepeating, DATE_FORMAT) :
                                                    "-------------------"
                                            }</Text>
                                    </View>
                                    <View style={renderItemInfo.item.indicatorStyle}/>
                                </View>
                                <View style={styles.separator}/>
                            </TouchableOpacity>
                        }}
                    />
                    {this.renderActionButton()}
                </View>
            ) : (
                <View style={styles.container}>
                    <Text>Нет тем для карточек</Text>
                    {this.renderActionButton()}
                </View>
            )}
        </View>
    }

    private getStyleForIndicator(cardTeam: CardsGroup, cards: Card[]) {
        const filteredCards: Card[] = _.filter(cards, (card: Card) => {
            return _.findIndex(card.teamIds, (teamId) => teamId === cardTeam.dateCreating) >= 0
        })
        const filteredCompletedCards: Card[] = _.filter(cards, (card: Card) => {
            return _.findIndex(card.teamIds, (teamId) => teamId === cardTeam.dateCreating) >= 0 && card.rangeOfKnowledge === 2
        })
        if (filteredCompletedCards && filteredCompletedCards.length) {
            const percentOfCompleted = filteredCards.length / filteredCompletedCards.length
            if (percentOfCompleted === 1) {
                return [styles.indicator, styles.completed_indicator]
            } else {
                return [styles.indicator, styles.in_progress_indicator]
            }
        } else {
            return [styles.indicator, styles.not_complited_indicator]
        }
    }

    private renderActionButton = () => {
        return (<ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => {
                this.props.navigation.navigate(STACK_NAVIGATION_ROUTES_NAMES.NEW_CARD_GROUP_SCREEN)
            }}
        />)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    main_information_container: {
        flex: 1,
        flexDirection: "column"
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 100
    },
    completed_indicator: {
        backgroundColor: "green"
    },
    in_progress_indicator: {
        backgroundColor: "yellow"
    },
    not_complited_indicator: {
        backgroundColor: "red"
    },
    separator: {
        height: 1,
        backgroundColor: "#d5d6d8"
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
        flexDirection: "row",
        flex: 1,
        backgroundColor: "white",
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
    card_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    borderGreen: {
        borderColor: "green"
    },
    title: {
        flex: 1,
        marginTop: 5,
        height: 30
    }
})

AppRegistry.registerComponent("CardsGroupsComponent", () => CardsGroupsComponent)

interface IProps {
    navigation: any;
}

interface IState {
    modalVisible: boolean;
    nameCardsGroup: string;
    isError: boolean;
    cardsGroups: CardsGroup[];
    cardsCount: number;
}
