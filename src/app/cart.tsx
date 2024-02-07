import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useCartStore } from '../stores/cart-store'
import { Card } from '../components/Card'
import ButtonLink from '../components/ButtonLink'

export default function Cart() {
  const cart = useCartStore()
  const cartCurrency = cart.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  // console.log(cartCurrency.toFixed(2))
  return (
    <ScrollView className="flex-1 bg-slate-900 px-5 py-9">
      <Image source={require('../assets/logo.png')} className="w-32 h-6" />
      <Text className="text-white text-xl font-bold mt-2">Seu carrinho</Text>
      <View className="w-full h-[0.5px] bg-slate-700 my-5" />
      {cart.products.map((product) => (
        <Card
          image={product.thumbnail}
          productDescription={product.description}
          productName={`${product.title} - ${product.quantity}`}
        />
      ))}
      <View className="w-full h-[0.5px] bg-slate-700 my-5" />
      <View className="flex-row items-center">
        <Text className="text-white text-xl font-bold">Total: </Text>
        <Text className="text-lime-400 text-2xl font-bold ml-2">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(cartCurrency)}
        </Text>
      </View>
      <View className="w-full h-32 bg-slate-800 rounded-md px-4 pt-3">
        <TextInput
          className="w-full h-full"
          multiline
          textAlignVertical="top"
          placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
          placeholderTextColor={'#94A3B8'}
        />
      </View>
      <ButtonLink primary title="Enviar pedido" />
      <ButtonLink secondary title="Voltar ao cardápio" href={'/'} />
    </ScrollView>
  )
}
