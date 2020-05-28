import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Section, Title } from '../common';
import { Colors } from '../config';

export const ExampleModalContent = () => {
  return (
    <View style={ styles.content }>
      <View style={ styles.header }>
        <View style={ styles.pullIcon } />
      </View>

      <Section isLarge>
        <Title value="Title 1" />
      </Section>

      <Section>
        <Text>
          Bacon ipsum dolor amet meatball sausage beef frankfurter short loin
          ribeye pork porchetta burgdoggen biltong tail, ham pastrami t-bone.
          Boudin porchetta shankle beef ribs drumstick flank turducken ham hock.
          Chuck spare ribs buffalo frankfurter, rump swine kielbasa ball tip
          pork chop ham porchetta tenderloin. Salami short loin buffalo turkey
          pork ribeye. Leberkas short loin meatball bacon.
        </Text>
      </Section>

      <Section isLarge>
        <Title value="Title 2" />
      </Section>

      <Section>
        <Text>
          Bacon ipsum dolor amet meatball sausage beef frankfurter short loin
          ribeye pork porchetta burgdoggen biltong tail, ham pastrami t-bone.
          Boudin porchetta shankle beef ribs drumstick flank turducken ham hock.
          Chuck spare ribs buffalo frankfurter, rump swine kielbasa ball tip
          pork chop ham porchetta tenderloin. Salami short loin buffalo turkey
          pork ribeye. Leberkas short loin meatball bacon.
        </Text>
      </Section>

      <Section isLarge>
        <Title value="Title 3" />
      </Section>

      <Section>
        <Text>
          Bacon ipsum dolor amet meatball sausage beef frankfurter short loin
          ribeye pork porchetta burgdoggen biltong tail, ham pastrami t-bone.
          Boudin porchetta shankle beef ribs drumstick flank turducken ham hock.
          Chuck spare ribs buffalo frankfurter, rump swine kielbasa ball tip
          pork chop ham porchetta tenderloin. Salami short loin buffalo turkey
          pork ribeye. Leberkas short loin meatball bacon.
        </Text>
      </Section>

      <Section isLarge>
        <Title value="Title 4" />
      </Section>

      <Section>
        <Text>
          Bacon ipsum dolor amet meatball sausage beef frankfurter short loin
          ribeye pork porchetta burgdoggen biltong tail, ham pastrami t-bone.
          Boudin porchetta shankle beef ribs drumstick flank turducken ham hock.
          Chuck spare ribs buffalo frankfurter, rump swine kielbasa ball tip
          pork chop ham porchetta tenderloin. Salami short loin buffalo turkey
          pork ribeye. Leberkas short loin meatball bacon.
        </Text>
      </Section>
    </View>
  )
}

const styles = {
  content: {
    backgroundColor: Colors.WHITE,
    minHeight: '100%',
    padding: 20,
    paddingBottom: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },  
  pullIcon: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 5,
    height: 10,
    width: 50,
  }

}