<?php

namespace App\Services;

use Shippo;
use Shippo_Rate;
use Shippo_Shipment;
use Shippo_Transaction;

class ShippoService
{
    public function __construct()
    {
        Shippo::setApiKey(env('SHIPPO_API_KEY'));
    }
    public function createShipment($fromAddress, $toAddress, $parcel)
    {
        $shipment = Shippo_Shipment::create([
            'address_from' => $fromAddress,
            'address_to' => $toAddress,
            'parcels' => [$parcel],
            'async' => false,
        ]);

        return $shipment;
    }

    public function getRates($shipment)
    {
        // Controlla se shipment è un array e ha tariffe
        if (is_array($shipment) && isset($shipment['rates']) && !empty($shipment['rates'])) {
            return $shipment['rates'];
        } elseif (is_object($shipment) && isset($shipment->rates) && !empty($shipment->rates)) {
            return $shipment->rates;
        }

        // Se non ci sono tariffe, gestisci l'errore
        return null; // O un array vuoto se preferisci
    }

    public function createTransaction($rate)
    {
        $transaction  = Shippo_Transaction::create([
            'rate' => $rate["object_id"],
            'label_file_type' => "PDF",
            'async' => false,
        ]);

        return $transaction;
    }
}
