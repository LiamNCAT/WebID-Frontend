import Vue from 'vue'
import Register from '@/components/registration'
import axios from 'axios'
import forge from 'node-forge'

const $rdf = require('rdflib')

jest.mock('axios')

describe('registration.vue', () => {
  it('Register should give rdf true', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor().$mount()

    var RDF = new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
    var FOAF = new $rdf.Namespace('http://xmlns.com/foaf/0.1/')

    const store = $rdf.graph()
    var me = $rdf.sym('https://www.w3.org/People/Berners-Lee/card#i')

    store.add(me, FOAF('name'), 'Albert Bloggs')
    store.add(me, RDF('type'), FOAF('Person'))

    axios.post.mockResolvedValue(store.toString())

    const spy = jest.spyOn(vm, 'registerPerson')
    const person = vm.registerPerson()

    expect(spy).toHaveBeenCalled()
    expect(person).toBeTruthy()
  })
  it('Register should give cert', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor().$mount()

    var pki = forge.pki

    var keys = pki.rsa.generateKeyPair(2048)
    var cert = pki.createCertificate()
    cert.publicKey = keys.publicKey
    // alternatively set public key from a csr
    // cert.publicKey = csr.publicKey;
    // NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
    // Conforming CAs should ensure serialNumber is:
    // - no more than 20 octets
    // - non-negative (prefix a '00' if your value starts with a '1' bit)
    cert.serialNumber = '01'
    cert.validity.notBefore = new Date()
    cert.validity.notAfter = new Date()
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
    var attrs = [{
      name: 'commonName',
      value: 'example.org'
    }, {
      name: 'countryName',
      value: 'US'
    }, {
      shortName: 'ST',
      value: 'Virginia'
    }, {
      name: 'localityName',
      value: 'Blacksburg'
    }, {
      name: 'organizationName',
      value: 'Test'
    }, {
      shortName: 'OU',
      value: 'Test'
    }]
    cert.setSubject(attrs)
    // alternatively set subject from a csr
    // cert.setSubject(csr.subject.attributes);
    cert.setIssuer(attrs)
    cert.setExtensions([{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true
    }, {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 6, // URI
        value: 'http://example.org/webid#me'
      }, {
        type: 7, // IP
        ip: '127.0.0.1'
      }]
    }, {
      name: 'subjectKeyIdentifier'
    }])

    cert.sign(keys.privateKey)

    axios.post.mockResolvedValue(cert)

    const spy = jest.spyOn(vm, 'createCert')
    const certAvail = vm.createCert()

    expect(spy).toHaveBeenCalled()
    expect(certAvail).toBeTruthy()
  })
})
