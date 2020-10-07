<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Filesystem\Filesystem;
use App\Forms\CurrencyType;

class AppController extends AbstractController
{
	private $currencies = [	1 => ["symbol" => "€", "rate" => 1],
							2 => ["symbol" => "$", "rate" => 0.9]];	


	private $currenciesOptions = [	['id' => 1, "symbol" => "€"],
									['id' => 2, "symbol" => "$"]];	

	/**
	 * @Route("/", name="app")
	 */
	public function index()
	{
		return $this->render('base.html.twig');
	}

	/**
	 * @Route("/api/currencies", name="getCurrencies")
	 */
	public function getCurrencies()
	{
		return new JsonResponse([
					'currencies' => $this->currenciesOptions
				]);
	}



	private function getSuccessResponse($data = [])
	{
		return new JsonResponse([
						'status'    => 'success',
						'data'      => $data
					]);
	}
	private function getFailResponse($message = "Action failed")
	{
		return new JsonResponse([
						'status'    => 'fail',
						'error'      => $message
					]);
	}
	private function recordCalculation($fields, $result){
		$resultText = "";
		foreach ($fields as $index => $field) {
			if($index != 0) $resultText .= "+ ";
			$resultText .= $field["value"] . $this->currencies[$field["currency"]]["symbol"] . " ";
		}
		$resultText .= "= " . $result . ". \n";

		$filesystem = new Filesystem();
		$filesystem->appendToFile('logs.txt', $resultText);
	}

	/**
	 * @Route("/api/calculate", name="calculate")
	 */
	public function calculate(Request $request)
	{
		$data = json_decode($request->getContent(), true);
		
		if(!isset($data['fields']) || count($data['fields']) < 2){
			return $this->getFailResponse('Invalid Data');
		}

		$resultValue = 0;
		$resultCurrency = $data["fields"][0]["currency"];

		foreach ($data["fields"] as $field) {
			if($field["currency"] == $resultCurrency){
				$resultValue += $field["value"];
			}else{
				$resultValue = $resultValue * $this->currencies[$resultCurrency]["rate"] + 
								$field["value"] * $this->currencies[$field["currency"]]["rate"];
				$resultCurrency = 1;
			}
		}
		$result = $resultValue . $this->currencies[$resultCurrency]["symbol"];
		$this->recordCalculation($data["fields"], $result);
		return $this->getSuccessResponse($result);
	}

	
}
