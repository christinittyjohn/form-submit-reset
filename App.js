/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import isEqual from 'lodash/isEqual';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {Dropdown} from 'react-native-material-dropdown';

import {RadioButton} from 'react-native-paper';

const App: () => React$Node = () => {
  const initialFormInputs = {
    firstName: '',
    lastName: '',
    gender: 'male',
    country: '',
  };
  const [formData, setFormData] = React.useState(initialFormInputs);
  const [showResults, setShowResults] = React.useState(false);

  const formFields = {
    firstName: {
      type: 'input',
      label: 'First Name',
    },
    lastName: {
      type: 'input',
      label: 'Last Name',
    },
    gender: {
      type: 'radio',
      options: ['male', 'female'],
      label: 'Gender',
    },
    country: {
      type: 'dropdown',
      options: ['US', 'IN'],
      label: 'Country',
    },
  };

  const renderRadioButtons = (option) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      key={option}>
      <Text style={{color: 'gray', fontSize: 20}}>{option}</Text>
      <RadioButton
        value={option}
        status={formData.gender === option ? 'checked' : 'unchecked'}
        onPress={() =>
          setFormData({
            ...formData,
            gender: option,
          })
        }
      />
    </View>
  );

  const renderDropDown = (options) => {
    const data = options.map((option) => ({value: option}));
    return (
      <Dropdown
        label="Country"
        data={data}
        editable={!showResults}
        onChangeText={(value) => setFormData({...formData, country: value})}
      />
    );
  };
  const renderFormFields = () =>
    Object.keys(formFields).map((field, index) => {
      switch (formFields[field].type) {
        case 'input':
          return (
            <View
              key={field}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{flex: 1, alignSelf: 'center', ...styles.labelStyle}}>
                {formFields[field].label}
              </Text>
              <TextInput
                key={index}
                onFocus={() => setFormData({...formData, [field]: ''})}
                editable={!showResults}
                style={{
                  height: 40,
                  width: 150,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  flex: 2,
                  borderRadius: 10,
                  borderTopWidth: 0,
                }}
                onChangeText={(text) =>
                  setFormData({...formData, [field]: text})
                }
                value={formData[field]}
              />
            </View>
          );
        case 'radio':
          return formFields[field].options.map((option) =>
            renderRadioButtons(option),
          );
        case 'dropdown':
          return renderDropDown(formFields[field].options);
        default:
          return null;
      }
    });

  const renderResult = () => (
    <View>
      {showResults &&
        Object.keys(formFields).map((key) => (
          <View
            key={key}
            styles={{
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 20, color: 'gray'}}>
              {formFields[key].label}
            </Text>
            <Text style={{fontSize: 24}}>{formData[key]}</Text>
          </View>
        ))}
    </View>
  );
  const handleAction = (action) => {
    if (action === 'submit' && !isEqual(formData, initialFormInputs)) {
      setShowResults(true);
    } else {
      setFormData(initialFormInputs);
      setShowResults(false);
    }
  };
  const ActionButton = ({action = 'submit'}) => (
    <TouchableHighlight
      onPress={() => handleAction(action)}
      style={styles.actionButton}>
      <Text style={styles.buttonLabel}>
        {action === 'submit' ? 'SUBMIT' : 'RESET'}
      </Text>
    </TouchableHighlight>
  );
  return (
    <>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 26, color: 'midnightblue'}}>FORM</Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'midnightblue',
          }}>
          {showResults ? renderResult() : renderFormFields()}
          <Text style={styles.hint}>
            {showResults
              ? 'Reset to clear your inputs'
              : 'Submit to See your Inputs'}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <ActionButton />
          <ActionButton action="reset" />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: 'gray',
    fontSize: 20,
  },
  actionButton: {
    width: 75,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'cornflowerblue',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'white',
    alignSelf: 'center',
  },
  hint: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;
