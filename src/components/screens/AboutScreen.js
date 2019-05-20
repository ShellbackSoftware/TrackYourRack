/* eslint-disable max-len */
import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardSection, A } from '../common';

class AboutScreen extends React.Component {
  render() {
    const { containerStyle, headerStyle } = styles;

    return (
      <Card>
        <CardSection>
          <ScrollView style={containerStyle}>
          <Text>Thank you for choosing Track Your Rack! Your support, especially during this
            early phase, is greatly appreciated, and your feedback is always welcome! {'\n'}</Text>

          <Text>If you're reading this, then I'm sure you have some questions as to how this app
            works, or maybe what the future holds.{'\n'}</Text>

          <Text style={headerStyle}>Managing Lists</Text>
          <Text>In order to create a new custom list, simply tap on "Add New List" on the Home
            screen. You can't have two lists with the same name, but you can delete lists
            and re-create them if you want.{'\n'}</Text>

          <Text>If you want to add polishes to your list, simply tap on the list you want to add polishes to.
            On the List screen, tap on the icon in the top right corner. From here, tap on "Add Polishes To {'{List}'}".
            Then, you can long press on any polish to change to edit mode. Select as many polishes as you want to add to
            the current list, and tap "Add Selected Polishes". You'll then be redirected to the page you came from, with
            the new polishes added to your list!{'\n'}</Text>

          <Text>In order to remove polishes, simply navigate to the list you want to edit, and long press on of the
             polishes in the main polish screen. This will active the edit mode, and allow you to remove polishes from
             your list!{'\n'}</Text>

          <Text>Through all of the lists, you'll see a search box. This search box searches the name of the polish as
            well as the brand, and it's a live search, so the results change depending on what the query is. {'\n'}</Text>

          <Text>Finally, if you tap on a polish in any list, you'll see more information about it. On this screen, you can add this single polish to one of your lists, or remove it from the current list. {'\n'}</Text>

          <Text style={headerStyle}>Adding a Polish</Text>
          <Text>In order to add a new polish to the database, you need to go to the 'All Polishes' list. From there, tap
             on the button in the top right corner. Here, you can manually fill in all of the information for the polish.
             As you type in a brand name, a dropdown will pop up containing brands that are already in the system. The
             only fields that are required are the polish name and brand. You can upload a swatch from your phone at the
             bottom of the form.{'\n'}</Text>

          <Text style={headerStyle}>Feature Roadmap</Text>
          <Text>Now that the instructions are out of the way, here's the roadmap for major features, in order of implementation:</Text>
          <Text>1. Editing polish. Right now, after you upload a polish, that's it. I need to figure out a way to allow users to edit the polish while respecting the original uploader's information.</Text>
          <Text>2. Show and edit user profiles</Text>
          <Text>3. Friends list</Text>
          <Text>4. Multiple swatches per polish</Text>
          <Text style={{ textDecorationLine: 'line-through' }} >5. Barcode scanner</Text>
          <Text style={{ fontStyle: 'italic' }}> Unfortunately, there's no centralized database to query with the UPC, so I can't implement a barcode scanner yet. </Text>
          <Text>6. Chat</Text>
          <Text>7. Rating system for polishes</Text>
          <Text>Of course, there will be aesthetic changes periodically as we near full release, so any and all feedback is welcome! You can email me at <A url='mailto:admin@shellbacksoftware.com' title='admin@shellbacksoftware.com' /></Text>
          </ScrollView>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default AboutScreen;
