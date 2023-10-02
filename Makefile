# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://git.datapunt.amsterdam.nl/Datapunt/python-best-practices/blob/master/dependency_management/
#
# VERSION = 2020.01.29
.PHONY: app

dc = docker compose
run = $(dc) run --rm

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

push: build                         ## Push prod image to Amsterdam registry
	$(dc) push

app:                                ## Run app
	$(run) --service-ports web

dev:						        ## Run the development app
	$(run) --service-ports web

test:						        ## Execute tests
	$(run) unittest $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

deploy_kubectl: build
	$(dc) push dev  # Push dev image to kind registry
	kubectl apply -f manifests

undeploy_kubectl:
	kubectl delete -f manifests

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginxinc/nginx-unprivileged:mainline-alpine-slim

requirements: ## Upgrade requirements (in package.json and package-lock.json) to latest versions
	npm upgrade 
