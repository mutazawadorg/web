import { Given } from '@cucumber/cucumber'
import { World } from '../environment'
import { config } from '../../config'
import { LoginPage, RuntimePage } from '../../support'

Given('{string} has logged in', async function (this: World, stepUser: string): Promise<void> {
  const user = this.usersEnvironment.getUser({ id: stepUser })
  const actor = await this.actorsEnvironment.createActor({ id: stepUser })
  const loginPage = new LoginPage({ actor })

  await actor.page.goto(config.frontendUrl)
  await loginPage.login({ user })
})

Given('{string} has logged out', async function (this: World, stepUser: string): Promise<void> {
  const actor = await this.actorsEnvironment.getActor({ id: stepUser })
  const runtimePage = new RuntimePage({ actor })
  await runtimePage.logout()
  await actor.close()
})