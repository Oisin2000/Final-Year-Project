<SafeAreaView>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>The Film Club</Text>
            <Text style={styles.subtitle}>Your Home for all things Film</Text>
        </SafeAreaView>
        <SafeAreaView>

        
        <ListItem
        title="Oisin O'Donnell"
        subtitle="oisinodonnell123@gmail.com"
        image={require('../assets/account.jpg')}

        />

        <ListItem
        title="My Genres"
        subtitle="Action , Thrillers"
        image={require('../assets/Genre.png')}
        
        

        />

<ListItem
        title="My Theme"
        subtitle="Choose your favourite colour scheme"
        image={require('../assets/Theme.png')}
        onPress={handleTheme}
      />

      <Modal visible={showModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Select a theme:</Text>

          {Object.entries(colours).map(([themeName, themeColors]) => (
            <TouchableOpacity key={themeName} onPress={() => selectTheme(themeColors)}>
              <View style={{ backgroundColor: themeColors.primary, padding: 10, marginVertical: 5 }}>
                <Text style={{ color: themeColors.white }}>{themeName}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

        </SafeAreaView>
        <View style={styles.buttoncontainer}>
        <MaterialCommunityIcons name="logout" size={30}/>
        <Button style={styles.button} title='Sign Out' onPress={ () => {logout()}}/>
        </View>
        </SafeAreaView>
    );