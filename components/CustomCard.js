import { Card, Title, Paragraph, Button } from 'react-native-paper';

const CustomCard = ({ title, description, imageUri, actions = [] }) => {
  return (
    <Card style={{ margin: 16 }}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
      {imageUri && <Card.Cover source={{ uri: imageUri }} />}
      <Card.Actions>
        {actions.map((action, index) => (
          <Button key={index} onPress={action.onPress}>
            {action.label}
          </Button>
        ))}
      </Card.Actions>
    </Card>
  );
};

export default CustomCard;
