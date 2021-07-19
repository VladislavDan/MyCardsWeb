import React, {Component} from "react"
import {
    AppRegistry,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import {Dimensions} from "react-native"
import {RANGE_OF_KNOWLEDGE} from "../../common/Constants"
import {Card} from "../../types/screens/cards-screen/Card"
import {CardsRepeaterManager} from './CardsRepeaterManager'
import {CardsStatus} from '../../types/screens/cards-screen/CardsStatus'

export class CardsRepeaterComponent extends Component<IProps, IState & CardsStatus> {

    public manager: CardsRepeaterManager
    private scrollView

    constructor(props) {
        super(props)
        this.state = {
            isVisibleQuestion: true,
            isError: false,
            moreFamiliarCards: [],
            lowFamiliarCards: [],
            notFamiliarCards: [],
            currentCard: null,
            cardsGroupId: -1
        }
        this.manager = new CardsRepeaterManager()
        this.manager.statusCardsChannel.subscribe((cardsStatus) => {
            this.setState({
                moreFamiliarCards: cardsStatus.moreFamiliarCards,
                lowFamiliarCards: cardsStatus.lowFamiliarCards,
                notFamiliarCards: cardsStatus.notFamiliarCards,
                currentCard: cardsStatus.currentCard
            })
        });
        this.manager.errorChannel.subscribe((error) => {
            console.error(error)
            this.setState({isError: true})
        });
    }

    public componentDidMount(): void {
        const {cardsGroupId} = this.props.route.params;
        this.setState({
            cardsGroupId
        });
        this.manager.repeatCardsChannel.next(cardsGroupId);
    }

    public render() {
        return this.state.currentCard ? (<View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={[styles.scoreStyle, styles.colorRed]}>{this.state.notFamiliarCards.length}</Text>
                <Text style={[styles.scoreStyle, styles.colorYellow]}>{this.state.lowFamiliarCards.length}</Text>
                <Text style={[styles.scoreStyle, styles.colorGreen]}>{this.state.moreFamiliarCards.length}</Text>
            </View>

            <TouchableOpacity
                style={styles.flipButtonContainer}
                onPress={() => {
                    this.setState({
                        isVisibleQuestion: !this.state.isVisibleQuestion
                    })
                }}
            >
                <Image source={require("../../img/360_black.png")} style={styles.flipButtonImage}/>
            </TouchableOpacity>
            {this.state.isVisibleQuestion ? (
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => {
                        this.setState({
                            isVisibleQuestion: !this.state.isVisibleQuestion
                        })
                    }}
                >
                    <Text
                        style={
                            [styles.questionAnswerText, {fontSize: this.getTextSize(this.state.currentCard.question)}]}
                    >
                        {this.state.currentCard.question}
                    </Text>
                </TouchableOpacity>
            ) : (this.state.currentCard.answer.length > 40 ? (
                    <View style={[styles.cardContainer, styles.borderGreen]}>
                        <ScrollView style={styles.scrollView} ref={view => this.scrollView = view}>
                            <Text
                                style={[
                                    styles.questionAnswerText,
                                    {fontSize: this.getTextSize(this.state.currentCard.answer)}
                                ]}
                            >
                                {this.state.currentCard.answer}
                            </Text>
                        </ScrollView>
                    </View>) : (<Text
                    style={[
                        styles.questionAnswerText,
                        {fontSize: this.getTextSize(this.state.currentCard.answer)}
                    ]}>
                    {this.state.currentCard.answer}
                </Text>)
            )}
            {!this.state.isVisibleQuestion ? (<View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    const card: Card = this.state.currentCard
                    if (card) {
                        card.rangeOfKnowledge = RANGE_OF_KNOWLEDGE.LOW_FAMILIAR_CARD
                        card.dateRepeating = new Date().getTime()
                        this.manager.changeCardsStatusChannel.next({card, cardsGroupId: this.state.cardsGroupId})
                        this.setState({isVisibleQuestion: !this.state.isVisibleQuestion})
                    }
                }}>
                    <Text>Не верно</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.borderGreen]} onPress={() => {
                    const card: Card = this.state.currentCard
                    if (card) {
                        card.rangeOfKnowledge = RANGE_OF_KNOWLEDGE.MORE_FAMILIAR_CARD
                        card.dateRepeating = new Date().getTime()
                        this.manager.changeCardsStatusChannel.next({card, cardsGroupId: this.state.cardsGroupId})
                        this.setState({isVisibleQuestion: !this.state.isVisibleQuestion})
                    }
                }}>
                    <Text>Верно</Text>
                </TouchableOpacity>
            </View>) : null}
        </View>) : (
            <View style={styles.cardContainer}>
                <Text style={styles.questionAnswerText}>Все изучено</Text>
                <TouchableOpacity style={[styles.button, styles.borderGreen]} onPress={() => {
                    this.manager.resetCardsChannel.next(this.state.cardsGroupId)
                    this.setState({isVisibleQuestion: !this.state.isVisibleQuestion})
                }}>
                    <Text>Повторить?</Text>
                </TouchableOpacity>
            </View>
        )
    }

    public getTextSize(text: string) {
        return text.length < 40 ? 22 : 15
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
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
        height: Dimensions.get("screen").height - 290,
        backgroundColor: "white",
        margin: 5,
        borderWidth: 4,
        borderColor: "#ed7368",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10
    },
    questionAnswerText: {
        fontWeight: "bold",
        color: "black"
    },
    borderGreen: {
        borderColor: "green"
    },
    borderRed: {
        borderColor: "red"
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
    },
    scrollView: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    flipButtonImage: {
        tintColor: "white",
        height: 30,
        width: 40,
        marginVertical: 10
    },
    flipButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        backgroundColor: "#85a6ff",
        marginHorizontal: 10,
        marginVertical: 5
    },
    cardAnswerContainer: {
        position: "absolute",
        top: 85,
        width: Dimensions.get("screen").width - 10,
        height: Dimensions.get("screen").height - 300,
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden",
        margin: 5,
        borderColor: "green",
        borderWidth: 4
    }
})

AppRegistry.registerComponent("CardsRepeaterComponent", () => CardsRepeaterComponent)

interface IProps {
    navigation: any;
    route: any;
}

interface IState {
    isVisibleQuestion: boolean;
    isError: boolean;
    cardsGroupId: number
}
