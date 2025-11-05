import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Button,
  Section,
  Row,
  Column,
  Link,
} from '@react-email/components'

export const ShippingUpdate = ({ order }: { order: any }) => (
  <Html>
    <Head />
    <Body
      style={{
        fontFamily: 'Manrope, sans-serif',
        background: '#f5f5f5',
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Header */}
        <Section
          style={{
            padding: '30px 40px',
            backgroundColor: '#000000',
            textAlign: 'center',
          }}
        >
          <Img
            src="https://audiophile-ecommerce-website.netlify.app/assets/shared/desktop/logo.svg"
            alt="Audiophile"
            width="140"
            height="25"
            style={{ margin: '0 auto', display: 'block' }}
          />
        </Section>

        {/* Main Content */}
        <Section style={{ padding: '40px' }}>
          <Text
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 20px',
              color: '#000000',
            }}
          >
            Your Order is On the Way!
          </Text>

          <Text
            style={{ fontSize: '16px', margin: '0 0 30px', color: '#000000' }}
          >
            Great news, {order.name.split(' ')[0]}! Your order{' '}
            <strong>#{order.id.slice(0, 8)}</strong> has been shipped and is on
            its way to you.
          </Text>

          <Section
            style={{
              backgroundColor: '#f8f8f8',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '30px',
            }}
          >
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                margin: '0 0 15px',
                color: '#000000',
              }}
            >
              Shipping Details
            </Text>
            <Text style={{ margin: '5px 0', color: '#000000' }}>
              <strong>Tracking Number:</strong> SHIP-{order.id.slice(0, 8)}
            </Text>
            <Text style={{ margin: '5px 0', color: '#000000' }}>
              <strong>Carrier:</strong> DHL Express
            </Text>
            <Text style={{ margin: '5px 0', color: '#000000' }}>
              <strong>Estimated Delivery:</strong> 3-5 business days
            </Text>
          </Section>

          <Button
            href="https://audiophile-ecommerce-website.netlify.app/track-order"
            style={{
              background: '#D87D4A',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
              fontSize: '16px',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '30px',
            }}
          >
            Track Your Package
          </Button>

          <Text
            style={{
              fontSize: '16px',
              margin: '0 0 30px',
              color: '#000000',
              textAlign: 'center',
            }}
          >
            You'll receive another email when your package is out for delivery.
          </Text>
        </Section>

        {/* Footer */}
        <Section
          style={{
            padding: '30px 40px',
            backgroundColor: '#000000',
            textAlign: 'center',
          }}
        >
          <Row>
            <Column>
              <Img
                src="https://audiophile-ecommerce-website.netlify.app/assets/shared/desktop/logo.svg"
                alt="Audiophile"
                width="140"
                height="25"
                style={{ margin: '0 auto 20px', display: 'block' }}
              />
              <Text style={{ color: '#ffffff', margin: '0 0 20px' }}>
                © {new Date().getFullYear()} Audiophile. All rights reserved.
              </Text>

              <Row style={{ textAlign: 'center', margin: '0 auto' }}>
                <Column style={{ width: '25%', display: 'inline-block' }}>
                  <Link
                    href="https://facebook.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      margin: '0 10px',
                    }}
                  >
                    <Img
                      src="https://audiophile-ecommerce-website.netlify.app/assets/shared/desktop/icon-facebook.svg"
                      alt="Facebook"
                      width="24"
                      height="24"
                    />
                  </Link>
                </Column>
                <Column style={{ width: '25%', display: 'inline-block' }}>
                  <Link
                    href="https://twitter.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      margin: '0 10px',
                    }}
                  >
                    <Img
                      src="https://audiophile-ecommerce-website.netlify.app/assets/shared/desktop/icon-twitter.svg"
                      alt="Twitter"
                      width="24"
                      height="24"
                    />
                  </Link>
                </Column>
                <Column style={{ width: '25%', display: 'inline-block' }}>
                  <Link
                    href="https://instagram.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      margin: '0 10px',
                    }}
                  >
                    <Img
                      src="https://audiophile-ecommerce-website.netlify.app/assets/shared/desktop/icon-instagram.svg"
                      alt="Instagram"
                      width="24"
                      height="24"
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
)
