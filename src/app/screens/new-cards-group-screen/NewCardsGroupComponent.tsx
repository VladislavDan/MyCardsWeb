import React, {Component} from "react";
import {
    Alert, AppRegistry, Button, StyleSheet, TextInput, View
} from "react-native";
import {CardsGroup} from "../../types/screens/cards-screen/CardsGroup";
import {MAX_TITLE_LENGTH} from "../../common/Constants";
import {NewCardsGroupManager} from './NewCardsGroupManager'

export class NewCardsGroupComponent extends Component<Props, State> {

    public manager: NewCardsGroupManager;

    constructor(props) {
        super(props);

        this.state = {
            nameCardsGroup: "",
            isError: false
        };
    }

    componentDidMount() {
        this.manager = new NewCardsGroupManager();
        this.manager.errorChannel.subscribe((error) => {
            console.error(error);
            this.setState({isError: true});
        });
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
                    this.manager.successCreateCardsGroupChannel.subscribe(() => {
                        console.log('back')
                        this.props.navigation.goBack();
                    });
                    this.manager.createCardsGroupChannel.next({
                        dateCreating: new Date().getTime(),
                        nameCardsGroup: this.state.nameCardsGroup
                    });
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

AppRegistry.registerComponent('NewCardsGroupComponent', () => NewCardsGroupComponent);


interface Props {
    cardsGroups: CardsGroup[];
    route: any,
    navigation: any
}

interface State {
    nameCardsGroup: string;
    isError: boolean;
}
