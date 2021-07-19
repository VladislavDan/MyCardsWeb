import React, {Component} from "react";
import {Alert, AppRegistry, Button, FlatList, StyleSheet, Text, View} from "react-native";
import {BackupItemComponent} from "./BackupItemComponent";
import {BackupManager} from './BackupManager'
import {IGoogleSignInSuccess} from '../../types/screens/backup-screen/GoogleSignInSuccess'
import {IBackupFile} from '../../types/screens/backup-screen/BackupFile'

export class BackupComponent extends Component<Props, State> {

    public static navigationOptions = {
        title: "Создание бекапа задач"
    };

    public manager: BackupManager;

    constructor(props) {
        super(props);
        this.state = {
            accessToken: "",
            isError: false,
            error: null,
            backupFiles: []
        };
        this.manager = new BackupManager()
        this.manager.errorChannel.subscribe((error) => {
            console.error(error);
            this.setState({isError: true});
        });
        this.manager.resultChannel.subscribe((result: IGoogleSignInSuccess) => {
            this.setState({isError: false, error: null, accessToken: result.accessToken});
        });
        this.manager.listOfFilesChannel.subscribe( (backupFiles: IBackupFile[]) => {
            this.setState({backupFiles: backupFiles});
        });
    }

    public componentWillUnmount(): void {
        this.manager.destroy();
    }

    public render() {
        return this.state.isError
            ? this.renderError()
            :
            (
                this.state.accessToken
                    ? this.renderBackupPage()
                    : this.renderSignInPage()
            );
    }

    public renderError() {
        return (
            <View style={styles.signInContainer}>
                <Text style={styles.errorMessage}>Ошибка: {this.state.error}</Text>
                <Button
                    onPress={() => {
                        this.setState({isError: false, error: null});
                    }}
                    color="#ABABAB"
                    title="Попробовать снова"
                />
            </View>
        );
    }

    public renderSignInPage() {
        return (
            <View style={styles.signInContainer}>
                <Button
                    onPress={() => {
                        this.manager.clickBackupButtonChannel.next();
                    }}
                    color="#ABABAB"
                    title="Подключить диск"
                />
            </View>
        );
    }

    public renderBackupPage() {
        return (
            <View style={styles.container}>
                {this.renderFileList()}
                <Button
                    onPress={() => {
                        this.manager.clickCreateBackupButtonChannel.next()
                    }}
                    color="#ABABAB"
                    title="Сделать бэкап"
                />
            </View>
        );
    }

    public renderFileList() {
        return this.state.backupFiles && this.state.backupFiles.length > 0
            ? (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.backupFiles}
                        renderItem={({item}) =>
                            <BackupItemComponent
                                file={item}
                                onClickBackup={this.onClickBackup}
                            />
                        }
                        keyExtractor={(_item: any, index: number) => index + ""}
                    />
                </View>
            )
            : <Text>Нет предыдущих бекапов</Text>;
    }

    public onClickBackup = (fileId) => {
        
        Alert.alert(
            "Действия с бэкапом",
            "Выберите необходимое действие",
            [
                {text: "Удалить", onPress: () => this.onDeleteBackup(fileId)},
                {text: "Загрузить", onPress: () => this.onLoadBackup(fileId)},
            ],
            {cancelable: true}
        );
    }

    public onDeleteBackup(fileId: string) {
        Alert.alert(
            "Удаление бекапа",
            "Вы уверены что хотите удалить бекап?",
            [
                {
                    text: "Нет", onPress: () => {
                    }
                },
                {
                    text: "Да", onPress: () => {
                        this.manager.deleteBackupChannel.next(fileId);
                    }
                }
            ],
            {cancelable: true}
        );
    }

    public onLoadBackup(fileId: string) {
        Alert.alert(
            "Загрузка бекапа",
            "Вы уверены что хотите загрузить бекап? Это удалит предыдущие изменения.",
            [
                {
                    text: "Нет", onPress: () => {
                    }
                },
                {
                    text: "Да", onPress: () => {
                          this.manager.loadBackupChannel.next(fileId)
                    }
                },
            ],
            {cancelable: true}
        );
    }
}

AppRegistry.registerComponent("BackupComponent", () => BackupComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        backgroundColor: "white"
    },
    signInContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessage: {
        margin: 10
    }
});

interface Props {
}

interface State {
    accessToken: string;
    isError: boolean;
    error: any,
    backupFiles: IBackupFile[]
}
