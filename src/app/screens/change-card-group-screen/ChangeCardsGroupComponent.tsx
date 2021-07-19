import React, {Component} from "react";
import {
    Alert,
    AppRegistry, Button, StyleSheet, TextInput, View
} from "react-native";
import {CardsGroup} from "../../types/screens/cards-screen/CardsGroup";
import {MAX_TITLE_LENGTH} from "../../common/Constants";
import {ChangeCardsGroupManager} from './NewCardsGroupManager'

class ChangeCardsGroupComponent extends Component<Props, State> {

    public manager: ChangeCardsGroupManager;

    constructor(props) {
        super(props);

        this.state = {
            nameCardsGroup: "",
            isError: false
        };
    }

    componentDidMount() {
        this.manager = new ChangeCardsGroupManager();
        this.manager.errorChannel.subscribe((error) => {
            console.error(error);
            this.setState({isError: true});
        });
        const {cardsGroupId} = this.props.route.params;
        if(cardsGroupId){
            this.manager.initializeNewCardsGroupsChannel.next(cardsGroupId);
            this.manager.nameCardsGroupChannel.subscribe((nameCardsGroup: string) => {
                this.setState({nameCardsGroup: nameCardsGroup})
            })
        }
    }

    public componentWillUnmount(): void {
        this.manager.destroy();
    }

    render() {
        return <View style={styles.container}>
            <TextInput
                style={{height: 40}}
                placeholder="Введите тему"
                maxLength={MAX_TITLE_LENGTH}
                onChangeText={(text) => this.setState({nameCardsGroup: text})}
            />
            <Button onPress={() => {
                if (this.state.nameCardsGroup) {
                    this.manager.createCardsGroupChannel.next({
                        dateCreating: new Date().getTime(),
                        nameCardsGroup: this.state.nameCardsGroup
                    })
                } else {
                    Alert.alert(
                        'Ошибка',
                        'Название темы пустое',
                        [{
                            text: 'OK', onPress: () => {
                            }
                        },],
                        {cancelable: true}
                    );
                }
            }}
                    color='#ABABAB'
                    title='Сохранить'/>
        </View>
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 10
        }
    });

AppRegistry.registerComponent('NewCardsGroupComponent', () => ChangeCardsGroupComponent);


interface Props {
    cardsGroups: CardsGroup[];
    route: any,
    navigation: any
}

interface State {
    nameCardsGroup: string;
    isError: boolean;
}
