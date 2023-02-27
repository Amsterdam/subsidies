# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://git.datapunt.amsterdam.nl/Datapunt/python-best-practices/blob/master/dependency_management/
#
# VERSION = 2020.01.29

PYTHON = python3

dc = docker compose
run = $(dc) run --rm

trivy: 	    						## Detect image vulnerabilities
	$(dc) build web
	trivy image --ignore-unfixed 127.0.0.1:5001/subsidieregister

kustomize:
	kustomize build manifests/overlays/local | kubectl apply -f -

undeploy_kustomize:
	kustomize build manifests/overlays/local | kubectl delete -f -